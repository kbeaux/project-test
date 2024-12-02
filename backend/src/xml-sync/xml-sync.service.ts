import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as xml2js from "xml2js";
import axios from "axios";
import { Property } from "../property/entities/property.entity";
import { Agency } from "../agency/entities/agency.entity";
import { PropertyXmlDto } from "./dto/property-xml.dto";
import * as fs from "fs/promises";
import * as path from "path";
import * as crypto from "crypto";
import * as sharp from "sharp";
import { Room } from "../property/entities/room.entity";
import { Document } from "../property/entities/document.entity";
import { Address } from "../property/entities/address.entity";
import { Contact } from "../property/entities/contact.entity";

@Injectable()
export class XmlSyncService {
  private readonly logger = new Logger(XmlSyncService.name);
  private readonly uploadDir: string;
  private readonly defaultImagePath: string;
  private readonly defaultImageDestination = "uploads/properties/wallpartners";

  // Configurations pour les images
  private readonly imageConfig = {
    maxWidth: 1920,
    quality: 80,
    formats: {
      jpg: { quality: 80 },
      webp: { quality: 75 },
    },
  };

  constructor(
    private configService: ConfigService,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
    @InjectRepository(Document)
    private documentRepository: Repository<Document>,
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>
  ) {
    // Utiliser path.join pour gérer correctement les chemins Windows
    this.uploadDir = path.join(process.cwd(), "uploads", "properties");
    this.defaultImagePath = path.join(
      process.cwd(),
      "assets",
      "wallpartners.jpg"
    );

    this.logger.log("XmlSyncService initialized");
    this.logger.debug("Upload directory:", this.uploadDir);
    this.logger.debug("Default image path:", this.defaultImagePath);

    this.ensureUploadDirExists();
    this.copyDefaultImage();
  }

  private async ensureUploadDirExists() {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
      this.logger.log(
        `Upload directory created/verified at: ${this.uploadDir}`
      );
    } catch (error) {
      this.logger.error("Error creating upload directory:", error);
      this.logger.debug("Error details:", error);
    }
  }

  private async copyDefaultImage() {
    try {
      // Vérifier si le fichier existe
      try {
        await fs.access(this.defaultImagePath);
        this.logger.debug("Default image found at:", this.defaultImagePath);
      } catch (error) {
        this.logger.error(
          `Default image not found at: ${this.defaultImagePath}`
        );
        return;
      }

      // Créer les versions optimisées de l'image par défaut
      const defaultImageBuffer = await fs.readFile(this.defaultImagePath);
      await this.optimizeAndSaveImage(defaultImageBuffer, "wallpartners");

      this.logger.log("Default image copied and optimized successfully");
    } catch (error) {
      this.logger.error("Error copying default image:", error);
      this.logger.debug("Attempted path:", this.defaultImagePath);
    }
  }

  private async optimizeAndSaveImage(
    buffer: Buffer,
    fileName: string
  ): Promise<string[]> {
    try {
      const savedPaths: string[] = [];
      const baseFileName = path.parse(fileName).name;

      // Créer une instance Sharp
      const image = sharp(buffer);

      // Redimensionner si nécessaire
      const metadata = await image.metadata();
      if (metadata.width && metadata.width > this.imageConfig.maxWidth) {
        image.resize(this.imageConfig.maxWidth, null, {
          withoutEnlargement: true,
          fit: "inside",
        });
      }

      // Sauvegarder en JPEG
      const jpegPath = path.join(this.uploadDir, `${baseFileName}.jpg`);
      await image.jpeg(this.imageConfig.formats.jpg).toFile(jpegPath);
      savedPaths.push(`uploads/properties/${baseFileName}.jpg`);

      // Sauvegarder en WebP pour les navigateurs modernes
      const webpPath = path.join(this.uploadDir, `${baseFileName}.webp`);
      await image.webp(this.imageConfig.formats.webp).toFile(webpPath);
      savedPaths.push(`uploads/properties/${baseFileName}.webp`);

      return savedPaths;
    } catch (error) {
      this.logger.error(`Error optimizing image ${fileName}:`, error);
      return [];
    }
  }

  @Cron(CronExpression.EVERY_HOUR)
  // @Cron("*/30 * * * * *")
  async syncData() {
    try {
      this.logger.log("########### Starting XML sync... ###########");

      const xmlData = await this.downloadXmlFile();
      const parsedData = await this.parseXmlData(xmlData);
      await this.updateDatabase(parsedData);

      this.logger.log("XML sync completed successfully");
    } catch (error) {
      this.logger.error("XML sync failed:", error);
    }
  }

  private async downloadXmlFile(): Promise<string> {
    const url = this.configService.get("XML_URL");
    const response = await axios.get(url);
    return response.data;
  }

  private async parseXmlData(xmlData: string): Promise<PropertyXmlDto[]> {
    const parser = new xml2js.Parser({
      explicitArray: false,
      mergeAttrs: true,
      valueProcessors: [
        (value: string) => {
          if (/^\d+$/.test(value)) return parseInt(value, 10);
          if (/^\d+\.\d+$/.test(value)) return parseFloat(value);
          return value;
        },
      ],
    });

    const result = await parser.parseStringPromise(xmlData);

    // Log détaillé de la première propriété
    const properties = result.export.Agence.Biens.Bien || [];
    if (properties.length > 0) {
      this.logger.debug(
        "Structure de la première propriété:",
        JSON.stringify(properties[0], null, 2)
      );
    }

    return properties;
  }

  private async updateDatabase(properties: PropertyXmlDto[]) {
    for (const propertyData of properties) {
      try {
        await this.processProperty(propertyData);
      } catch (error) {
        this.logger.error(
          `Error processing property ${propertyData.ID}:`,
          error
        );
      }
    }
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }

  private async downloadWithRetry(
    url: string,
    maxRetries = 2,
    timeout = 5000
  ): Promise<any | null> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await axios.get(url, {
          responseType: "arraybuffer",
          timeout: timeout,
          validateStatus: (status) => status === 200,
        });
        return response;
      } catch (error) {
        if (error.response?.status === 404) {
          // Log en warning pour les 404
          this.logger.warn(`Image not found (404): ${url}`);
          return null;
        }

        if (attempt === maxRetries) {
          this.logger.error(
            `Failed to download image after ${maxRetries} attempts: ${url}`
          );
          return null;
        }

        // Log de la tentative
        this.logger.debug(`Retry ${attempt}/${maxRetries} for ${url}`);
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }
    return null;
  }

  private async processImages(documents?: {
    Document?: any;
  }): Promise<string[]> {
    try {
      // Si pas de documents du tout, utiliser l'image par défaut
      if (!documents?.Document) {
        this.logger.debug("No documents found, using default image");
        return [
          `${this.defaultImageDestination}.jpg`,
          `${this.defaultImageDestination}.webp`,
        ];
      }

      const docs = Array.isArray(documents.Document)
        ? documents.Document
        : [documents.Document];

      // Filtrer les documents valides
      const validDocs = docs.filter((doc) => doc && doc.Filename);

      if (validDocs.length === 0) {
        this.logger.debug("No valid documents found, using default image");
        return [
          `${this.defaultImageDestination}.jpg`,
          `${this.defaultImageDestination}.webp`,
        ];
      }

      // Log du nombre d'images à traiter
      this.logger.debug(`Processing ${validDocs.length} images`);

      const allSavedPaths: string[] = [];
      const chunks = this.chunkArray(validDocs, 3);

      for (const chunk of chunks) {
        const chunkResults = await Promise.allSettled(
          chunk.map((doc) => this.downloadAndSaveImage(doc.Filename))
        );

        // Traiter les résultats
        for (let i = 0; i < chunkResults.length; i++) {
          const result = chunkResults[i];
          if (result.status === "fulfilled" && result.value.length > 0) {
            allSavedPaths.push(...result.value);
          } else {
            this.logger.debug(`Failed to download image: ${chunk[i].Filename}`);
          }
        }
      }

      // N'utiliser l'image par défaut que si AUCUNE image n'a été téléchargée
      if (allSavedPaths.length === 0) {
        this.logger.warn(
          "No images were successfully downloaded, using default image"
        );
        return [
          `${this.defaultImageDestination}.jpg`,
          `${this.defaultImageDestination}.webp`,
        ];
      }

      // Log du résultat
      const successCount = allSavedPaths.length;
      const totalCount = validDocs.length;
      this.logger.log(
        `Images processed: ${successCount}/${totalCount} (${Math.round((successCount / totalCount) * 100)}% success)`
      );

      return allSavedPaths;
    } catch (error) {
      this.logger.error("Error in batch image processing:", error);
      // En cas d'erreur critique seulement, utiliser l'image par défaut
      return [
        `${this.defaultImageDestination}.jpg`,
        `${this.defaultImageDestination}.webp`,
      ];
    }
  }

  private async downloadAndSaveImage(imageUrl: string): Promise<string[]> {
    try {
      // Générer un nom de fichier unique
      const fileName = `${crypto.randomUUID()}`;

      // Télécharger l'image
      const response = await this.downloadWithRetry(imageUrl);
      if (!response) {
        this.logger.debug(`Failed to download image: ${imageUrl}`);
        return [];
      }

      // Optimiser et sauvegarder dans différents formats
      const savedPaths = await this.optimizeAndSaveImage(
        Buffer.from(response.data),
        fileName
      );

      if (savedPaths.length > 0) {
        this.logger.debug(`Successfully saved image: ${imageUrl}`);
      }

      return savedPaths;
    } catch (error) {
      this.logger.warn(`Error downloading image ${imageUrl}: ${error.message}`);
      return [];
    }
  }

  private async processProperty(propertyData: PropertyXmlDto) {
    try {
      // Vérifier si la propriété existe
      let property = await this.propertyRepository.findOne({
        where: { ref: propertyData.ID },
        relations: ["rooms", "documents", "address", "contacts"],
      });

      // Créer ou mettre à jour l'adresse
      const address = await this.processAddress(
        propertyData.BienAddress,
        property?.address
      );

      // Traiter les documents/images
      const documents = await this.processDocuments(
        propertyData.Documents,
        property?.documents
      );

      // Traiter les pièces
      const rooms = await this.processRooms(propertyData.Room, property?.rooms);

      // Traiter les contacts
      const contacts = await this.processContacts(
        propertyData.BienContact,
        property?.contacts
      );

      // Préparer les données de la propriété
      const propertyEntity = {
        displayRef: propertyData.displayRef,
        ref: propertyData.ID,
        category: propertyData.Category,
        type: propertyData.Type,
        transactionType: propertyData.TransactionType,
        surface: propertyData.Surface,
        price: propertyData.SoldPrice?._,
        rentalPrice: propertyData.RentalPrice
          ? {
              period: propertyData.RentalPrice.period as "MONTHLY" | "ANNUAL",
              amount:
                propertyData.RentalPrice.RentExclCharges?.amount?.[0]?._ || 0,
              currency:
                propertyData.RentalPrice.RentExclCharges?.amount?.[0]
                  ?.currency || "EUR",
            }
          : undefined,
        agencyFees: propertyData.AgencyFees
          ? {
              paidBy: propertyData.AgencyFees.paidBy as "OWNER" | "TENANT",
              amount: propertyData.AgencyFees.BuyerFees?.amount?.[0]?._ || 0,
            }
          : undefined,
        mandatNum: propertyData.MandatNum,
        mandatBeginDate: propertyData.MandatBeginDate,
        mandatEndDate: propertyData.MandatEndDate,
        mandatEndFirstPeriodDate: propertyData.MandatEndFirstPeriodDate,
        mandatInfo: {
          isExclusive: propertyData.IsExclusif?._ === "true",
          isCoExclusive: propertyData.IsExclusif?.CoExclu === "true",
          isSemiExclusive: propertyData.IsExclusif?.SemiExclu === "true",
        },
        dpe: propertyData.DPE
          ? {
              dateDiagnostic: new Date(propertyData.DPE.dateDiagnostic),
              pe: propertyData.DPE.PE || 0,
              pe_letter: propertyData.DPE.PE_letter || "N/A",
              ges: propertyData.DPE.GES || 0,
              ges_letter: propertyData.DPE.GES_letter || "N/A",
              annualEnergyCosts: {
                lowRange:
                  propertyData.DPE.AnnualEnergyCostsLowRange?.amount?._ || 0,
                highRange:
                  propertyData.DPE.AnnualEnergyCostsHighRange?.amount?._ || 0,
                currency:
                  propertyData.DPE.AnnualEnergyCostsLowRange?.amount
                    ?.currency || "EUR",
              },
              costEstimateBaseYear:
                propertyData.DPE.CostEstimateBaseYear ||
                new Date().getFullYear(),
            }
          : undefined,
        description: Array.isArray(propertyData.Descriptions?.Description)
          ? propertyData.Descriptions?.Description[0]?._
          : propertyData.Descriptions?.Description?._ || "",
        // ... autres champs de la propriété ...
      };

      if (property) {
        // Mise à jour de la propriété existante
        await this.propertyRepository.update(property.id, propertyEntity);
        property = await this.propertyRepository.findOne({
          where: { id: property.id },
        });
      } else {
        // Création d'une nouvelle propriété
        property = this.propertyRepository.create(propertyEntity);
        property = await this.propertyRepository.save(property);
      }

      if (!property) {
        throw new Error("Failed to create/update property");
      }

      // Associer les relations
      property.address = address;
      property.rooms = rooms;
      property.documents = documents;
      property.contacts = contacts;

      // Sauvegarder la propriété avec ses relations
      await this.propertyRepository.save(property);

      return property;
    } catch (error) {
      this.logger.error(`Error processing property ${propertyData.ID}:`, error);
      throw error;
    }
  }

  private async processAddress(
    addressData: any,
    existingAddress?: Address
  ): Promise<Address> {
    // Logique pour créer ou mettre  jour une adresse
    const addressEntity = {
      streetNumber: addressData?.VoieNumber,
      streetName: addressData?.VoieName,
      zipCode: addressData?.Zipcode,
      city: addressData?.ZipcodeCity,
      cityRichTypo: addressData?.CityRichTypo,
      altCode: addressData?.AltCode,
      country: addressData?.country || "FR",
      latitude: addressData?.lat,
      longitude: addressData?.long,
      // ... autres champs de l'adresse ...
    };

    if (existingAddress) {
      await this.addressRepository.update(existingAddress.id, addressEntity);
      const updatedAddress = await this.addressRepository.findOne({
        where: { id: existingAddress.id },
      });
      if (!updatedAddress) {
        throw new Error(
          `Failed to find updated address with id ${existingAddress.id}`
        );
      }
      return updatedAddress;
    }

    const newAddress = this.addressRepository.create(addressEntity);
    return this.addressRepository.save(newAddress);
  }

  private async processRooms(
    roomsData: any[] = [],
    existingRooms: Room[] = []
  ): Promise<Room[]> {
    try {
      const rooms: Room[] = [];

      // Convertir roomsData en tableau s'il ne l'est pas déjà
      const roomsArray = Array.isArray(roomsData)
        ? roomsData
        : [roomsData].filter(Boolean);

      for (const roomData of roomsArray) {
        const roomEntity = {
          type: roomData.type,
          surface: roomData.surface,
          description: roomData.description,
          level: roomData.level,
        };

        // Chercher une pièce existante correspondante
        const existingRoom = existingRooms.find(
          (room) => room.type === roomData.type && room.level === roomData.level
        );

        if (existingRoom) {
          // Mettre à jour la pièce existante
          await this.roomRepository.update(existingRoom.id, roomEntity);
          const updatedRoom = await this.roomRepository.findOne({
            where: { id: existingRoom.id },
          });
          if (updatedRoom) rooms.push(updatedRoom);
        } else {
          // Créer une nouvelle pièce
          const newRoom = this.roomRepository.create(roomEntity);
          const savedRoom = await this.roomRepository.save(newRoom);
          rooms.push(savedRoom);
        }
      }

      // Supprimer les pièces qui n'existent plus dans le XML
      const roomsToDelete = existingRooms.filter(
        (existingRoom) => !rooms.find((room) => room.id === existingRoom.id)
      );

      if (roomsToDelete.length > 0) {
        await this.roomRepository.remove(roomsToDelete);
      }

      return rooms;
    } catch (error) {
      this.logger.error("Error processing rooms:", error);
      throw error;
    }
  }

  private async processDocuments(
    documentsData: any,
    existingDocuments: Document[] = []
  ): Promise<Document[]> {
    try {
      const documents: Document[] = [];

      // Convertir documentsData en tableau s'il ne l'est pas déjà
      const documentsArray = Array.isArray(documentsData?.Document)
        ? documentsData.Document
        : [documentsData?.Document].filter(Boolean);

      for (const docData of documentsArray) {
        // Télécharger et optimiser l'image si c'est un document de type Image
        let savedPaths: string[] = [];
        if (docData.type === "Image" && docData.Filename) {
          savedPaths = await this.downloadAndSaveImage(docData.Filename);
        }

        const documentEntity = {
          type: docData.type,
          format: docData.format,
          filename: savedPaths[0] || docData.Filename, // Utiliser le premier chemin sauvegardé ou l'URL originale
          title: docData.Title,
          md5: docData.md5,
        };

        // Chercher un document existant correspondant
        const existingDoc = existingDocuments.find(
          (doc) => doc.md5 === docData.md5 || doc.filename === docData.Filename
        );

        if (existingDoc) {
          // Mettre à jour le document existant
          await this.documentRepository.update(existingDoc.id, documentEntity);
          const updatedDoc = await this.documentRepository.findOne({
            where: { id: existingDoc.id },
          });
          if (updatedDoc) documents.push(updatedDoc);
        } else {
          // Créer un nouveau document
          const newDoc = this.documentRepository.create(documentEntity);
          const savedDoc = await this.documentRepository.save(newDoc);
          documents.push(savedDoc);
        }
      }

      // Supprimer les documents qui n'existent plus dans le XML
      const docsToDelete = existingDocuments.filter(
        (existingDoc) => !documents.find((doc) => doc.id === existingDoc.id)
      );

      if (docsToDelete.length > 0) {
        await this.documentRepository.remove(docsToDelete);
      }

      return documents;
    } catch (error) {
      this.logger.error("Error processing documents:", error);
      throw error;
    }
  }

  private processPhones(phoneData: any): { type: string; number: string; }[] {
    if (!phoneData) return [];
    
    try {
      const phones = Array.isArray(phoneData) ? phoneData : [phoneData].filter(Boolean);
      return phones.map(phone => ({
        type: phone.type || 'default',
        number: phone._text || phone.toString(),
      }));
    } catch (error) {
      this.logger.error('Error processing phones:', error);
      return [];
    }
  }

  private async processContacts(contactsData: any, existingContacts: Contact[] = []): Promise<Contact[]> {
    try {
      const contacts: Contact[] = [];
      
      // Convertir contactsData en tableau s'il ne l'est pas déjà
      const contactsArray = Array.isArray(contactsData) 
        ? contactsData 
        : [contactsData].filter(Boolean);

      for (const contactData of contactsArray) {
        const contactEntity = {
          externRef: contactData.externRef || '',
          title: contactData.Title || 'N/A',
          firstName: contactData.FName || '',
          lastName: contactData.LName || '',
          phones: this.processPhones(contactData.Phone),
          email: contactData.Email || '',
          rsac: contactData.RSAC || '',
          isIndependent: contactData.is_independant === 'true',
          address: contactData.Address ? {
            streetNumber: contactData.Address.VoieNumber || '',
            streetName: contactData.Address.VoieName || '',
            zipCode: contactData.Address.Zipcode || '',
            city: contactData.Address.ZipcodeCity || '',
            country: contactData.Address.country || 'FR',
          } : undefined,
        };

        // Chercher un contact existant correspondant
        const existingContact = existingContacts.find(
          (contact) => contact.externRef === contactData.externRef
        );

        if (existingContact) {
          // Mettre à jour le contact existant
          await this.contactRepository.update(
            existingContact.id,
            contactEntity
          );
          const updatedContact = await this.contactRepository.findOne({
            where: { id: existingContact.id },
          });
          if (updatedContact) contacts.push(updatedContact);
        } else {
          // Créer un nouveau contact
          const newContact = this.contactRepository.create(contactEntity);
          const savedContact = await this.contactRepository.save(newContact);
          if (savedContact) {
            contacts.push(savedContact);
          }
        }
      }

      // Supprimer les contacts qui n'existent plus dans le XML
      const contactsToDelete = existingContacts.filter(
        (existingContact) =>
          !contacts.find((contact) => contact.id === existingContact.id)
      );

      if (contactsToDelete.length > 0) {
        await this.contactRepository.remove(contactsToDelete);
      }

      return contacts;
    } catch (error) {
      this.logger.error('Error processing contacts:', error);
      throw error;
    }
  }
}

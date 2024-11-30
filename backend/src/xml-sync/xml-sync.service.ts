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
  //   @Cron("*/30 * * * * *")
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
      // Télécharger et sauvegarder les images
      const savedImages = await this.processImages(propertyData.Documents);
      // Vérifier si la propriété existe
      let property = await this.propertyRepository.findOne({
        where: { ref: propertyData.ID },
      });

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
              period: propertyData.RentalPrice.period,
              amount: propertyData.RentalPrice.RentExclCharges?.amount?.[0]?._,
              currency:
                propertyData.RentalPrice.RentExclCharges?.amount?.[0]?.currency,
            }
          : null,
        agencyFees: propertyData.AgencyFees
          ? {
              paidBy: propertyData.AgencyFees.paidBy,
              amount: propertyData.AgencyFees.BuyerFees?.amount?.[0]?._,
            }
          : null,
        location: {
          address: propertyData.BienAddress?.Zipcode,
          city: propertyData.BienAddress?.CityRichTypo,
          zipCode: propertyData.BienAddress?.Zipcode?.toString(),
          // Si vous avez des coordonnées, les ajouter ici
        },
        images: savedImages,
        description: propertyData.Descriptions?.Description?._ || "",
        features: [], // À adapter selon vos besoins
      };

      if (property) {
        // Update existing property
        await this.propertyRepository.update(
          property.id,
          propertyEntity as unknown as Partial<Property>
        );
        this.logger.log(`Updated property ${property.ref}`);
      } else {
        // Create new property
        property = this.propertyRepository.create(
          propertyEntity as unknown as Partial<Property>
        );
        await this.propertyRepository.save(property);
        this.logger.log(`Created new property ${property.ref}`);
      }

      return property;
    } catch (error) {
      this.logger.error(`Error processing property ${propertyData.ID}:`, error);
      throw error;
    }
  }
}

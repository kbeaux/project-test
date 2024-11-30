// import { Injectable, Logger } from '@nestjs/common';
// import { Cron, CronExpression } from '@nestjs/schedule';
// import { ConfigService } from '@nestjs/config';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import * as ftp from 'basic-ftp';
// import * as xml2js from 'xml2js';
// import { Writable } from 'stream';
// import { Property } from '../property/entities/property.entity';
// import { Agency } from '../agency/entities/agency.entity';
// import { PropertyXmlDto } from './dto/property-xml.dto';

// @Injectable()
// export class FtpSyncService {
//   private readonly logger = new Logger(FtpSyncService.name);

//   constructor(
//     private configService: ConfigService,
//     @InjectRepository(Property)
//     private propertyRepository: Repository<Property>,
//     @InjectRepository(Agency)
//     private agencyRepository: Repository<Agency>,
//   ) {}

//   @Cron(CronExpression.EVERY_HOUR)
//   async syncData() {
//     try {
//       this.logger.log('Starting FTP sync...');
      
//       const client = new ftp.Client();
//       client.ftp.verbose = true;

//       await client.access({
//         host: this.configService.get('FTP_HOST'),
//         user: this.configService.get('FTP_USER'),
//         password: this.configService.get('FTP_PASSWORD'),
//       });

//       const xmlData = await this.downloadXmlFile(client);
//       const parsedData = await this.parseXmlData(xmlData);
//       await this.updateDatabase(parsedData);

//       await client.close();
//       this.logger.log('FTP sync completed successfully');
//     } catch (error) {
//       this.logger.error('FTP sync failed:', error);
//     }
//   }

//   private async downloadXmlFile(client: ftp.Client): Promise<string> {
//     const chunks: Buffer[] = [];
//     const writable = new Writable({
//       write(chunk: Buffer, _encoding, callback) {
//         chunks.push(chunk);
//         callback();
//       },
//     });

//     await client.downloadTo(writable, 'properties.xml');
//     return Buffer.concat(chunks).toString('utf-8');
//   }

//   private async parseXmlData(xmlData: string): Promise<PropertyXmlDto[]> {
//     const parser = new xml2js.Parser({
//       explicitArray: false,
//       mergeAttrs: true,
//       valueProcessors: [
//         (value: string) => {
//           if (/^\d+$/.test(value)) return parseInt(value, 10);
//           if (/^\d+\.\d+$/.test(value)) return parseFloat(value);
//           return value;
//         },
//       ],
//     });

//     const result = await parser.parseStringPromise(xmlData);
//     return result.properties.property;
//   }

//   private async updateDatabase(properties: PropertyXmlDto[]) {
//     for (const propertyData of properties) {
//       try {
//         await this.processProperty(propertyData);
//       } catch (error) {
//         this.logger.error(
//           `Error processing property ${propertyData.ID}:`,
//           error
//         );
//       }
//     }
//   }

//   private async processProperty(propertyData: PropertyXmlDto) {
//     try {
//       // Vérifier si la propriété existe
//       let property = await this.propertyRepository.findOne({
//         where: { ref: propertyData.ID }
//       });
      
//       const getImages = (documents?: { Document?: any }) => {
//         if (!documents?.Document) return [];
        
//         if (Array.isArray(documents.Document)) {
//           return documents.Document.map(doc => doc.Filename);
//         }
        
//         if (documents.Document.Filename) {
//           return [documents.Document.Filename];
//         }
        
//         return [];
//       };
  
//       // Préparer les données de la propriété
//       const propertyEntity = {
//         displayRef: propertyData.displayRef,
//         ref: propertyData.ID,
//         category: propertyData.Category,
//         type: propertyData.Type,
//         transactionType: propertyData.TransactionType,
//         surface: propertyData.Surface,
//         price: propertyData.SoldPrice?._,
//         rentalPrice: propertyData.RentalPrice ? {
//           period: propertyData.RentalPrice.period,
//           amount: propertyData.RentalPrice.RentExclCharges?.amount?.[0]?._,
//           currency: propertyData.RentalPrice.RentExclCharges?.amount?.[0]?.currency,
//         } : null,
//         agencyFees: propertyData.AgencyFees ? {
//           paidBy: propertyData.AgencyFees.paidBy,
//           amount: propertyData.AgencyFees.BuyerFees?.amount?.[0]?._,
//         } : null,
//         location: {
//           address: propertyData.BienAddress?.Zipcode,
//           city: propertyData.BienAddress?.CityRichTypo,
//           zipCode: propertyData.BienAddress?.Zipcode?.toString(),
//           // Si vous avez des coordonnées, les ajouter ici
//         },
//         images: getImages(propertyData.Documents),
//         description: propertyData.Descriptions?.Description?._ || '',
//         features: [], // À adapter selon vos besoins
//       };
  
//       if (property) {
//         // Update existing property
//         await this.propertyRepository.update(
//           property.id,
//           propertyEntity as unknown as Partial<Property>
//         );
//         this.logger.log(`Updated property ${property.ref}`);
//       } else {
//         // Create new property
//         property = this.propertyRepository.create(
//           propertyEntity as unknown as Partial<Property>
//         );
//         await this.propertyRepository.save(property);
//         this.logger.log(`Created new property ${property.ref}`);
//       }
  
//       return property;
//     } catch (error) {
//       this.logger.error(
//         `Error processing property ${propertyData.ID}:`,
//         error
//       );
//       throw error;
//     }
//   }
// }
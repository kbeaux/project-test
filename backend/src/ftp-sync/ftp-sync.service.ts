import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as ftp from 'basic-ftp';
import * as xml2js from 'xml2js';
import { Writable } from 'stream';
import { Property } from '../property/entities/property.entity';
import { Agency } from '../agency/entities/agency.entity';
import { PropertyXmlDto } from './dto/property-xml.dto';

@Injectable()
export class FtpSyncService {
  private readonly logger = new Logger(FtpSyncService.name);

  constructor(
    private configService: ConfigService,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async syncData() {
    try {
      this.logger.log('Starting FTP sync...');
      
      const client = new ftp.Client();
      client.ftp.verbose = true;

      await client.access({
        host: this.configService.get('FTP_HOST'),
        user: this.configService.get('FTP_USER'),
        password: this.configService.get('FTP_PASSWORD'),
      });

      const xmlData = await this.downloadXmlFile(client);
      const parsedData = await this.parseXmlData(xmlData);
      await this.updateDatabase(parsedData);

      await client.close();
      this.logger.log('FTP sync completed successfully');
    } catch (error) {
      this.logger.error('FTP sync failed:', error);
    }
  }

  private async downloadXmlFile(client: ftp.Client): Promise<string> {
    const chunks: Buffer[] = [];
    const writable = new Writable({
      write(chunk: Buffer, _encoding, callback) {
        chunks.push(chunk);
        callback();
      },
    });

    await client.downloadTo(writable, 'properties.xml');
    return Buffer.concat(chunks).toString('utf-8');
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
    return result.properties.property;
  }

  private async updateDatabase(properties: PropertyXmlDto[]) {
    for (const propertyData of properties) {
      try {
        await this.processProperty(propertyData);
      } catch (error) {
        this.logger.error(
          `Error processing property ${propertyData.reference.internal}:`,
          error,
        );
      }
    }
  }

  private async processProperty(propertyData: PropertyXmlDto) {
    // Implementation remains the same...
  }
}
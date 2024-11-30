import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { MailerService } from '@nestjs-modules/mailer';
import { PropertyAlert } from './entities/property-alert.entity';
import { CreateAlertDto } from './dto/create-alert.dto';
import { PropertySearchService } from '../property/services/property-search.service';
import { SearchPropertyDto } from '@/property/dto/search-property.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(PropertyAlert)
    private alertRepository: Repository<PropertyAlert>,
    private readonly mailerService: MailerService,
    private readonly propertySearchService: PropertySearchService,
  ) {}

  async createAlert(userId: string, createAlertDto: CreateAlertDto): Promise<PropertyAlert> {
    const alert = this.alertRepository.create({
      user: { id: userId },
      criteria: createAlertDto.criteria,
      frequency: createAlertDto.frequency,
    });

    return this.alertRepository.save(alert);
  }

  async updateAlert(alertId: string, isActive: boolean): Promise<PropertyAlert | null> {
    await this.alertRepository.update(alertId, { isActive });
    return this.alertRepository.findOne({ where: { id: alertId } });
  }

  async getUserAlerts(userId: string): Promise<PropertyAlert[]> {
    return this.alertRepository.find({
      where: { user: { id: userId }, isActive: true },
    });
  }

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async sendDailyAlerts() {
    this.logger.log('Starting daily property alerts...');
    await this.processAlerts('daily');
  }

  @Cron(CronExpression.EVERY_WEEK)
  async sendWeeklyAlerts() {
    this.logger.log('Starting weekly property alerts...');
    await this.processAlerts('weekly');
  }

  private async processAlerts(frequency: 'daily' | 'weekly') {
    const alerts = await this.alertRepository.find({
      where: { frequency, isActive: true },
      relations: ['user'],
    });

    for (const alert of alerts) {
      try {
        const [properties] = await this.propertySearchService.search(alert.criteria as SearchPropertyDto);

        if (properties.length > 0) {
          await this.sendAlertEmail(alert, properties);
          await this.alertRepository.update(alert.id, {
            lastSentAt: new Date(),
          });
        }
      } catch (error) {
        this.logger.error(`Error processing alert ${alert.id}:`, error);
      }
    }
  }

  private async sendAlertEmail(alert: PropertyAlert, properties: any[]) {
    await this.mailerService.sendMail({
      to: alert.user.email,
      subject: `Your Property Alert - ${properties.length} New Properties Found`,
      template: 'property-alert',
      context: {
        properties,
        criteria: alert.criteria,
        frequency: alert.frequency,
      },
    });
  }
}
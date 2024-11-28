import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { SharePropertyDto } from './dto/share-property.dto';

@Injectable()
export class ShareService {
  constructor(private readonly mailerService: MailerService) {}

  async shareProperty(shareDto: SharePropertyDto): Promise<void> {
    if (shareDto.platform === 'email' && shareDto.recipientEmail) {
      await this.sendShareEmail(shareDto);
    }
  }

  private async sendShareEmail(shareDto: SharePropertyDto): Promise<void> {
    await this.mailerService.sendMail({
      to: shareDto.recipientEmail,
      subject: 'Property Shared with You',
      template: 'property-share',
      context: {
        propertyUrl: `${process.env.FRONTEND_URL}/properties/${shareDto.propertyId}`,
        message: shareDto.message,
      },
    });
  }
}
import { Injectable } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ContactService {
  constructor(private readonly mailerService: MailerService) {}

  async sendContactEmail(contactDto: ContactDto) {
    await this.mailerService.sendMail({
      to: 'contact@realestatepro.com',
      subject: `New Contact Form Submission: ${contactDto.subject}`,
      template: 'contact',
      context: {
        name: contactDto.name,
        email: contactDto.email,
        subject: contactDto.subject,
        message: contactDto.message,
      },
    });

    return { success: true };
  }
}
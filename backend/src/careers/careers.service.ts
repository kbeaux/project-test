import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { JobApplicationDto } from './dto/job-application.dto';

@Injectable()
export class CareersService {
  constructor(private readonly mailerService: MailerService) {}

  async submitApplication(application: JobApplicationDto, cvFile: Express.Multer.File) {
    await this.mailerService.sendMail({
      to: 'hr@realestatepro.com',
      subject: `New Job Application: ${application.position}`,
      template: 'application',
      context: {
        ...application,
      },
      attachments: [
        {
          filename: cvFile.originalname,
          content: cvFile.buffer,
        },
      ],
    });

    return { success: true };
  }
}
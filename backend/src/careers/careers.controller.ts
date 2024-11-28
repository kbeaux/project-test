import {
  Controller,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { CareersService } from './careers.service';
import { JobApplicationDto } from './dto/job-application.dto';

@ApiTags('careers')
@Controller('careers')
export class CareersController {
  constructor(private readonly careersService: CareersService) {}

  @Post('apply')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Submit job application' })
  @ApiResponse({ status: HttpStatus.OK })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('cv'))
  async apply(
    @Body() application: JobApplicationDto,
    @UploadedFile() cv: Express.Multer.File,
  ) {
    return this.careersService.submitApplication(application, cv);
  }
}
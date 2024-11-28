import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ShareService } from './share.service';
import { SharePropertyDto } from './dto/share-property.dto';

@ApiTags('property-share')
@Controller('properties')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post('share')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Share property' })
  @ApiResponse({ status: 200 })
  async shareProperty(@Body() shareDto: SharePropertyDto) {
    return this.shareService.shareProperty(shareDto);
  }
}
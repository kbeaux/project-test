import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import { CreateAlertDto } from './dto/create-alert.dto';
import { PropertyAlert } from './entities/property-alert.entity';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('alerts')
  @ApiOperation({ summary: 'Create property alert' })
  @ApiResponse({ status: 201, type: PropertyAlert })
  async createAlert(
    @Request() req,
    @Body() createAlertDto: CreateAlertDto,
  ): Promise<PropertyAlert> {
    return this.notificationsService.createAlert(req.user.id, createAlertDto);
  }

  @Get('alerts')
  @ApiOperation({ summary: 'Get user alerts' })
  @ApiResponse({ status: 200, type: [PropertyAlert] })
  async getUserAlerts(@Request() req): Promise<PropertyAlert[]> {
    return this.notificationsService.getUserAlerts(req.user.id);
  }

  @Patch('alerts/:id')
  @ApiOperation({ summary: 'Update alert status' })
  @ApiResponse({ status: 200, type: PropertyAlert })
  async updateAlert(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ): Promise<PropertyAlert> {
    return this.notificationsService.updateAlert(id, isActive);
  }
}
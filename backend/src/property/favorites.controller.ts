import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FavoritesService } from './favorites.service';
import { Property } from './entities/property.entity';

@ApiTags('favorites')
@Controller('favorites')
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get user favorites' })
  @ApiResponse({ status: 200, type: [Property] })
  async getFavorites(@Request() req) {
    return this.favoritesService.getUserFavorites(req.user.id);
  }

  @Post(':id')
  @ApiOperation({ summary: 'Add property to favorites' })
  @ApiResponse({ status: 201 })
  async addToFavorites(@Request() req, @Param('id') propertyId: string) {
    return this.favoritesService.addToFavorites(req.user.id, propertyId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove property from favorites' })
  @ApiResponse({ status: 200 })
  async removeFromFavorites(@Request() req, @Param('id') propertyId: string) {
    return this.favoritesService.removeFromFavorites(req.user.id, propertyId);
  }
}
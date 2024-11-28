import {
  Controller,
  Get,
  Query,
  UseGuards,
  ValidationPipe,
  ParseFloatPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PropertySearchService } from '../services/property-search.service';
import { PropertyValidationService } from '../services/property-validation.service';
import { SearchPropertyDto } from '../dto/search-property.dto';
import { Property } from '../entities/property.entity';

@ApiTags('property-search')
@Controller('properties/search')
@UseGuards(JwtAuthGuard)
export class PropertySearchController {
  constructor(
    private readonly propertySearchService: PropertySearchService,
    private readonly propertyValidationService: PropertyValidationService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Search properties with filters' })
  @ApiResponse({ status: 200, type: [Property] })
  async search(@Query(ValidationPipe) searchDto: SearchPropertyDto) {
    this.propertyValidationService.validateSearchCriteria(searchDto);
    const [properties, total] = await this.propertySearchService.search(searchDto);
    return {
      data: properties,
      total,
      page: searchDto.page || 1,
      limit: searchDto.limit || 10,
    };
  }

  @Get('nearby')
  @ApiOperation({ summary: 'Find properties near a location' })
  @ApiResponse({ status: 200, type: [Property] })
  async findNearby(
    @Query('lat', ParseFloatPipe) lat: number,
    @Query('lng', ParseFloatPipe) lng: number,
    @Query('radius', new DefaultValuePipe(5), ParseFloatPipe) radius: number,
  ) {
    const [properties] = await this.propertySearchService.search({
      lat,
      lng,
      radius,
    });
    return properties;
  }
}
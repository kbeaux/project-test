import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PropertyService } from './services/property.service';
import { SearchPropertyDto } from './dto/search-property.dto';
import { Property } from './entities/property.entity';
import { PropertyCategory } from './constants/property.constants';

@ApiTags('properties')
@Controller('properties')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Get('search')
  @ApiOperation({ summary: 'Search properties with filters' })
  @ApiResponse({ status: 200, type: [Property] })
  async search(@Query() searchDto: SearchPropertyDto): Promise<Property[]> {
    return this.propertyService.search(searchDto);
  }

  @Get('recent')
  @ApiOperation({ summary: 'Get recent properties' })
  @ApiResponse({ status: 200, type: [Property] })
  async findRecent(): Promise<Property[]> {
    return this.propertyService.findRecent();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get property by ID' })
  @ApiResponse({ status: 200, type: Property })
  @ApiResponse({ status: 404, description: 'Property not found' })
  async findById(@Param('id') id: string): Promise<Property> {
    const property = await this.propertyService.findById(id);
    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }
    return property;
  }

  @Get('category/:category')
  @ApiOperation({ summary: 'Get properties by category' })
  @ApiResponse({ status: 200, type: [Property] })
  async findByCategory(@Param('category') category: PropertyCategory): Promise<Property[]> {
    return this.propertyService.findByCategory(category);
  }
}
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { AgencyService } from './agency.service';
import { Agency } from './entities/agency.entity';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@ApiTags('agencies')
@Controller('agencies')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Get()
  @ApiOperation({ summary: 'Get all agencies' })
  @ApiResponse({ status: HttpStatus.OK, type: Agency, isArray: true })
  async findAll(): Promise<Agency[]> {
    return this.agencyService.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search agencies by location' })
  @ApiQuery({ name: 'city', required: false })
  @ApiQuery({ name: 'zipCode', required: false })
  @ApiQuery({ name: 'lat', required: false })
  @ApiQuery({ name: 'lng', required: false })
  @ApiQuery({ name: 'radius', required: false })
  @ApiResponse({ status: HttpStatus.OK, type: Agency, isArray: true })
  async search(
    @Query('city') city?: string,
    @Query('zipCode') zipCode?: string,
    @Query('lat') lat?: number,
    @Query('lng') lng?: number,
    @Query('radius') radius?: number,
  ): Promise<Agency[]> {
    if (city) {
      return this.agencyService.findByCity(city);
    }
    if (zipCode) {
      return this.agencyService.findByZipCode(zipCode);
    }
    if (lat && lng && radius) {
      return this.agencyService.findNearby(lat, lng, radius);
    }
    return this.agencyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get agency by ID' })
  @ApiResponse({ status: HttpStatus.OK, type: Agency })
  async findOne(@Param('id') id: string): Promise<Agency> {
    return this.agencyService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new agency' })
  @ApiResponse({ status: HttpStatus.CREATED, type: Agency })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createAgencyDto: CreateAgencyDto): Promise<Agency> {
    return this.agencyService.create(createAgencyDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an agency' })
  @ApiResponse({ status: HttpStatus.OK, type: Agency })
  async update(
    @Param('id') id: string,
    @Body() updateAgencyDto: UpdateAgencyDto,
  ): Promise<Agency> {
    return this.agencyService.update(id, updateAgencyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an agency' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    await this.agencyService.remove(id);
  }
}
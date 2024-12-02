import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { PropertySearchService } from './property-search.service';
import { PropertySearchFilters } from '../interfaces/property-search.interface';
import { PropertyCategory } from '../constants/property.constants';
import { SearchPropertyDto } from '../dto/search-property.dto';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    private propertySearchService: PropertySearchService,
  ) {}

  async findAll(): Promise<Property[]> {
    return this.propertyRepository.find({
      relations: ['agency'],
    });
  }

  async findById(id: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { id },
      relations: ['agency'],
    });

    if (!property) {
      throw new NotFoundException(`Property with ID ${id} not found`);
    }

    return property;
  }

  async findByCategory(category: PropertyCategory): Promise<Property[]> {
    return this.propertyRepository.find({
      where: { category },
      relations: ['agency'],
      order: { updatedAt: 'DESC' },
    });
  }

  async findRecent(limit = 16): Promise<Property[]> {
    return this.propertyRepository.find({
      relations: ['agency'],
      order: { updatedAt: 'DESC' },
      take: limit,
    });
  }

  async searchFilters(filters: PropertySearchFilters) {
    return this.propertySearchService.search(filters);
  }

  async findByReference(ref: string): Promise<Property> {
    const property = await this.propertyRepository.findOne({
      where: { ref },
      relations: ['agency'],
    });

    if (!property) {
      throw new NotFoundException(`Property with reference ${ref} not found`);
    }

    return property;
  }

  async search(searchDto: SearchPropertyDto): Promise<Property[]> {
    const query = this.propertyRepository.createQueryBuilder('property');

    if (searchDto.city) {
      query.andWhere('property.location->\'city\' ILIKE :city', {
        city: `%${searchDto.city}%`,
      });
    }

    if (searchDto.zipCode) {
      query.andWhere('property.location->\'zipCode\' = :zipCode', {
        zipCode: searchDto.zipCode,
      });
    }

    if (searchDto.surfaceMin) {
      query.andWhere('property.surface >= :surfaceMin', {
        surfaceMin: searchDto.surfaceMin,
      });
    }

    if (searchDto.surfaceMax) {
      query.andWhere('property.surface <= :surfaceMax', {
        surfaceMax: searchDto.surfaceMax,
      });
    }

    if (searchDto.priceMin) {
      query.andWhere('property.price >= :priceMin', {
        priceMin: searchDto.priceMin,
      });
    }

    if (searchDto.priceMax) {
      query.andWhere('property.price <= :priceMax', {
        priceMax: searchDto.priceMax,
      });
    }

    if (searchDto.category) {
      query.andWhere('property.category = :category', {
        category: searchDto.category,
      });
    }

    if (searchDto.transactionType) {
      query.andWhere('property.transactionType = :transactionType', {
        transactionType: searchDto.transactionType,
      });
    }

    // Geographical search if coordinates and radius are provided
    if (searchDto.lat && searchDto.lng && searchDto.radius) {
      query.andWhere(
        '(6371 * acos(cos(radians(:lat)) * cos(radians(CAST(property.location->>\'latitude\' AS FLOAT))) * cos(radians(CAST(property.location->>\'longitude\' AS FLOAT)) - radians(:lng)) + sin(radians(:lat)) * sin(radians(CAST(property.location->>\'latitude\' AS FLOAT))))) <= :radius',
        {
          lat: searchDto.lat,
          lng: searchDto.lng,
          radius: searchDto.radius,
        },
      );
    }

    query.leftJoinAndSelect('property.agency', 'agency');
    query.orderBy('property.updatedAt', 'DESC');

    return query.getMany();
  }
}
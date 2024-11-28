import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { SearchPropertyDto } from '../dto/search-property.dto';
import { PropertySearchFilters } from '../interfaces/property-search.interface';
import { PropertyValidationService } from './property-validation.service';
import { buildPropertyQuery } from '../utils/query-builder.utils';

@Injectable()
export class PropertySearchService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    private propertyValidationService: PropertyValidationService,
  ) {}

  async search(filters: PropertySearchFilters | SearchPropertyDto): Promise<[Property[], number]> {
    if ('page' in filters) {
      this.propertyValidationService.validateSearchCriteria(filters);
    }

    const query = buildPropertyQuery(
      this.propertyRepository.createQueryBuilder('property'),
      filters
    );

    // Apply pagination if available
    if ('page' in filters && 'limit' in filters) {
      const page = filters.page || 1;
      const limit = filters.limit || 10;
      query.skip((page - 1) * limit).take(limit);
    }

    // Add sorting
    query.orderBy('property.updatedAt', 'DESC');

    return query.getManyAndCount();
  }

  async findNearby(lat: number, lng: number, radius: number): Promise<Property[]> {
    const [properties] = await this.search({ lat, lng, radius });
    return properties;
  }
}
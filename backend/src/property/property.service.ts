import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { SearchPropertyDto } from './dto/search-property.dto';
import { PropertyCategory } from './constants/property.constants'

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

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

  async findRecent(): Promise<Property[]> {
    return this.propertyRepository.find({
      order: { updatedAt: 'DESC' },
      take: 8,
      relations: ['agency'],
    });
  }

  async findById(id: string): Promise<Property | null> {
    return this.propertyRepository.findOne({
      where: { id },
      relations: ['agency'],
    });
  }

  async findByCategory(category: string): Promise<Property[]> {
    return this.propertyRepository.find({
      where: { category: category as PropertyCategory },
      relations: ['agency'],
      order: { updatedAt: 'DESC' },
    });
  }
}
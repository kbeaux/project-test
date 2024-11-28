import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { PropertySearchService } from './property-search.service';
import { PropertySearchFilters } from '../interfaces/property-search.interface';
import { PropertyCategory } from '../constants/property.constants';

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

  async findRecent(limit = 8): Promise<Property[]> {
    return this.propertyRepository.find({
      relations: ['agency'],
      order: { updatedAt: 'DESC' },
      take: limit,
    });
  }

  async search(filters: PropertySearchFilters) {
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
}
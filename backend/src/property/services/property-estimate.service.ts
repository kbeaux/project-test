import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from '../entities/property.entity';
import { EstimateDto } from '../dto/estimate.dto';

@Injectable()
export class PropertyEstimateService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
  ) {}

  async estimateValue(estimateDto: EstimateDto) {
    // Get comparable properties
    const comparables = await this.findComparableProperties(estimateDto);
    
    // Calculate average price per m²
    const avgPricePerM2 = this.calculateAveragePricePerM2(comparables);
    
    // Calculate estimated value
    const estimatedValue = avgPricePerM2 * estimateDto.surface;
    
    // Calculate confidence score based on number of comparables
    const confidence = Math.min(95, 60 + (comparables.length * 5));

    return {
      estimatedPrice: estimatedValue,
      priceRange: {
        min: estimatedValue * 0.9,
        max: estimatedValue * 1.1,
      },
      confidence,
      comparables: comparables.length,
    };
  }

  private async findComparableProperties(estimateDto: EstimateDto) {
    const query = this.propertyRepository.createQueryBuilder('property')
      .where('property.category = :category', { category: estimateDto.category })
      .andWhere('property.transactionType = :transactionType', { transactionType: estimateDto.transactionType })
      .andWhere('property.surface BETWEEN :minSurface AND :maxSurface', {
        minSurface: estimateDto.surface * 0.7,
        maxSurface: estimateDto.surface * 1.3,
      })
      .andWhere(`
        ST_DWithin(
          ST_SetSRID(ST_MakePoint(
            CAST(property.location->>'longitude' AS FLOAT),
            CAST(property.location->>'latitude' AS FLOAT)
          ), 4326)::geography,
          ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
          :radius
        )
      `, {
        lat: estimateDto.location.latitude,
        lng: estimateDto.location.longitude,
        radius: 2000, // 2km radius
      });

    return query.getMany();
  }

  private calculateAveragePricePerM2(properties: Property[]) {
    if (properties.length === 0) return 0;
    
    const totalPricePerM2 = properties.reduce((sum, property) => {
      return sum + (property.price / property.surface);
    }, 0);
    
    return totalPricePerM2 / properties.length;
  }
}
import { SelectQueryBuilder } from 'typeorm';
import { Property } from '../entities/property.entity';
import { PropertySearchFilters } from '../interfaces/property-search.interface';

export function buildPropertyQuery(
  queryBuilder: SelectQueryBuilder<Property>,
  filters: PropertySearchFilters,
): SelectQueryBuilder<Property> {
  const query = queryBuilder
    .leftJoinAndSelect('property.agency', 'agency')
    .where('1 = 1'); // Base condition to allow chaining

  if (filters.category) {
    query.andWhere('property.category = :category', {
      category: filters.category,
    });
  }

  if (filters.transactionType) {
    query.andWhere('property.transactionType = :transactionType', {
      transactionType: filters.transactionType,
    });
  }

  if (filters.city) {
    query.andWhere('LOWER(property.location->\'city\') LIKE LOWER(:city)', {
      city: `%${filters.city}%`,
    });
  }

  if (filters.zipCode) {
    query.andWhere('property.location->\'zipCode\' = :zipCode', {
      zipCode: filters.zipCode,
    });
  }

  if (filters.surfaceMin) {
    query.andWhere('property.surface >= :surfaceMin', {
      surfaceMin: filters.surfaceMin,
    });
  }

  if (filters.surfaceMax) {
    query.andWhere('property.surface <= :surfaceMax', {
      surfaceMax: filters.surfaceMax,
    });
  }

  if (filters.priceMin) {
    query.andWhere('property.price >= :priceMin', {
      priceMin: filters.priceMin,
    });
  }

  if (filters.priceMax) {
    query.andWhere('property.price <= :priceMax', {
      priceMax: filters.priceMax,
    });
  }

  if (filters.lat && filters.lng && filters.radius) {
    query.andWhere(
      `ST_DWithin(
        ST_SetSRID(ST_MakePoint(
          CAST(property.location->>'longitude' AS FLOAT),
          CAST(property.location->>'latitude' AS FLOAT)
        ), 4326)::geography,
        ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography,
        :radius
      )`,
      {
        lat: filters.lat,
        lng: filters.lng,
        radius: filters.radius * 1000, // Convert km to meters
      },
    );
  }

  return query;
}
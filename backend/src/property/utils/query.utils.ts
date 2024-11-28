import { SelectQueryBuilder } from 'typeorm';
import { Property } from '../entities/property.entity';
import { PropertySearchFilters } from '../interfaces/property-search.interface';

export function applyPropertyFilters(
  query: SelectQueryBuilder<Property>,
  filters: PropertySearchFilters,
): SelectQueryBuilder<Property> {
  if (filters.city) {
    query.andWhere("property.location->>'city' ILIKE :city", {
      city: `%${filters.city}%`,
    });
  }

  if (filters.zipCode) {
    query.andWhere("property.location->>'zipCode' = :zipCode", {
      zipCode: filters.zipCode,
    });
  }

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

  applyPriceFilters(query, filters);
  applySurfaceFilters(query, filters);
  applyGeoFilters(query, filters);

  return query;
}

function applyPriceFilters(
  query: SelectQueryBuilder<Property>,
  filters: PropertySearchFilters,
): void {
  if (filters.priceMin && filters.priceMax) {
    query.andWhere('property.price BETWEEN :priceMin AND :priceMax', {
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
    });
  } else if (filters.priceMin) {
    query.andWhere('property.price >= :priceMin', {
      priceMin: filters.priceMin,
    });
  } else if (filters.priceMax) {
    query.andWhere('property.price <= :priceMax', {
      priceMax: filters.priceMax,
    });
  }
}

function applySurfaceFilters(
  query: SelectQueryBuilder<Property>,
  filters: PropertySearchFilters,
): void {
  if (filters.surfaceMin && filters.surfaceMax) {
    query.andWhere('property.surface BETWEEN :surfaceMin AND :surfaceMax', {
      surfaceMin: filters.surfaceMin,
      surfaceMax: filters.surfaceMax,
    });
  } else if (filters.surfaceMin) {
    query.andWhere('property.surface >= :surfaceMin', {
      surfaceMin: filters.surfaceMin,
    });
  } else if (filters.surfaceMax) {
    query.andWhere('property.surface <= :surfaceMax', {
      surfaceMax: filters.surfaceMax,
    });
  }
}

function applyGeoFilters(
  query: SelectQueryBuilder<Property>,
  filters: PropertySearchFilters,
): void {
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
}
import { BadRequestException } from '@nestjs/common';
import { SearchPropertyDto } from '../dto/search-property.dto';
import { PropertyCategory, TransactionType } from '../constants/property.constants';

export function validateSearchParams(params: SearchPropertyDto): void {
  validatePriceRange(params.priceMin, params.priceMax);
  validateSurfaceRange(params.surfaceMin, params.surfaceMax);
  validateGeoParams(params.lat, params.lng, params.radius);
  validateCategory(params.category);
  validateTransactionType(params.transactionType);
}

export function validatePriceRange(min?: number, max?: number): void {
  if (min !== undefined && max !== undefined && min > max) {
    throw new BadRequestException('Minimum price cannot be greater than maximum price');
  }
  if (min !== undefined && min < 0) {
    throw new BadRequestException('Price cannot be negative');
  }
}

export function validateSurfaceRange(min?: number, max?: number): void {
  if (min !== undefined && max !== undefined && min > max) {
    throw new BadRequestException('Minimum surface cannot be greater than maximum surface');
  }
  if (min !== undefined && min < 0) {
    throw new BadRequestException('Surface cannot be negative');
  }
}

export function validateGeoParams(lat?: number, lng?: number, radius?: number): void {
  if ((lat !== undefined || lng !== undefined || radius !== undefined) &&
      !(lat !== undefined && lng !== undefined && radius !== undefined)) {
    throw new BadRequestException('All geolocation parameters (lat, lng, radius) must be provided together');
  }

  if (lat !== undefined && (lat < -90 || lat > 90)) {
    throw new BadRequestException('Latitude must be between -90 and 90 degrees');
  }

  if (lng !== undefined && (lng < -180 || lng > 180)) {
    throw new BadRequestException('Longitude must be between -180 and 180 degrees');
  }

  if (radius !== undefined && radius <= 0) {
    throw new BadRequestException('Radius must be greater than 0');
  }
}

export function validateCategory(category?: string): void {
  if (category && !Object.values(PropertyCategory).includes(category as PropertyCategory)) {
    throw new BadRequestException('Invalid property category');
  }
}

export function validateTransactionType(type?: string): void {
  if (type && !Object.values(TransactionType).includes(type as TransactionType)) {
    throw new BadRequestException('Invalid transaction type');
  }
}
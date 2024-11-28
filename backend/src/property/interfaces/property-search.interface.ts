import { PropertyCategory, TransactionType } from '../constants/property.constants';

export interface PropertySearchFilters {
  city?: string;
  zipCode?: string;
  surfaceMin?: number;
  surfaceMax?: number;
  priceMin?: number;
  priceMax?: number;
  category?: PropertyCategory;
  transactionType?: TransactionType;
  lat?: number;
  lng?: number;
  radius?: number;
  page?: number;
  limit?: number;
}

export interface PropertySearchOptions {
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}
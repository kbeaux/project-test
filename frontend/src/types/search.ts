import { PropertyCategory, TransactionType } from './property';

export interface PropertySearchParams {
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

export interface SearchFilters extends PropertySearchParams {
  useCurrentLocation?: boolean;
}
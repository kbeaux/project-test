import api from '@/lib/axios';
import { Property } from '@/types/property';

export interface PropertySearchParams {
  city?: string;
  zipCode?: string;
  surfaceMin?: number;
  surfaceMax?: number;
  priceMin?: number;
  priceMax?: number;
  category?: string;
  transactionType?: string;
  lat?: number;
  lng?: number;
  radius?: number;
  page?: number;
  limit?: number;
}

export interface PropertySearchResponse {
  data: Property[];
  total: number;
  page: number;
  limit: number;
}

export async function searchProperties(params: PropertySearchParams): Promise<PropertySearchResponse> {
  const { data } = await api.get('/properties/search', { params });
  return data;
}

export async function getRecentProperties(): Promise<Property[]> {
  const { data } = await api.get('/properties/recent');
  return data;
}

export async function getPropertyById(id: string): Promise<Property> {
  const { data } = await api.get(`/properties/${id}`);
  return data;
}

export async function getNearbyProperties(lat: number, lng: number, radius: number = 5): Promise<Property[]> {
  const { data } = await api.get('/properties/search/nearby', {
    params: { lat, lng, radius },
  });
  return data;
}

export async function sendPropertyInquiry(propertyId: string, inquiry: {
  name: string;
  email: string;
  phone: string;
  message: string;
}): Promise<void> {
  await api.post(`/properties/${propertyId}/inquiries`, inquiry);
}

export async function getPropertyEstimate(data: {
  category: string;
  transactionType: string;
  surface: number;
  location: {
    address: string;
    city: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };
}): Promise<{
  estimatedPrice: number;
  priceRange: {
    min: number;
    max: number;
  };
  confidence: number;
  comparables: number;
}> {
  const { data: result } = await api.post('/properties/estimate', data);
  return result;
}
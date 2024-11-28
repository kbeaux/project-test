import { PropertyCategory, TransactionType } from '../../property/constants/property.constants';

export interface PropertyXmlDto {
  reference: {
    display: string;
    internal: string;
  };
  category: PropertyCategory;
  type: string;
  transaction: TransactionType;
  surface: number;
  price: number;
  rental?: {
    period: 'MONTHLY' | 'ANNUAL';
    amount: number;
    currency: string;
  };
  fees?: {
    paidBy: 'OWNER' | 'TENANT';
    amount: number;
  };
  heating?: {
    type: string;
  };
  location: {
    address: string;
    city: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  media: {
    images: string[];
  };
  description: string;
  features: string[];
  agency: {
    reference: string;
    name: string;
    siret: string;
    address: {
      country: string;
      street: string;
      number: string;
      zipCode: string;
      city: string;
    };
  };
}
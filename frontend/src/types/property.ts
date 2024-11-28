export enum PropertyCategory {
  COMMERCIAL = 'COMMERCIAL',
  OFFICE = 'OFFICE',
  RETAIL = 'RETAIL',
}

export enum TransactionType {
  SALE = 'SALE',
  RENT = 'RENT',
  TRANSFER = 'TRANSFER',
}

export interface Property {
  id: string;
  displayRef: string;
  ref: string;
  updatedAt: Date;
  category: PropertyCategory;
  type: string;
  transactionType: TransactionType;
  surface: number;
  price: number;
  rentalPrice?: {
    period: 'MONTHLY' | 'ANNUAL';
    amount: number;
    currency: string;
  };
  agencyFees?: {
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
    latitude: number;
    longitude: number;
  };
  images: string[];
  description: string;
  features: string[];
  agency: {
    id: string;
    commercialName: string;
    phone?: string;
    email?: string;
  };
}
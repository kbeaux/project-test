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

export const PROPERTY_TYPES = {
  COMMERCIAL: {
    SHOP: 'SHOP',
    RESTAURANT: 'RESTAURANT',
    BAR: 'BAR',
    HOTEL: 'HOTEL',
  },
  OFFICE: {
    OPEN_SPACE: 'OPEN_SPACE',
    PRIVATE: 'PRIVATE',
    COWORKING: 'COWORKING',
  },
  RETAIL: {
    BOUTIQUE: 'BOUTIQUE',
    SHOWROOM: 'SHOWROOM',
    GALLERY: 'GALLERY',
  },
} as const;

export const RENTAL_PERIODS = {
  MONTHLY: 'MONTHLY',
  ANNUAL: 'ANNUAL',
} as const;

export const FEES_PAID_BY = {
  OWNER: 'OWNER',
  TENANT: 'TENANT',
} as const;
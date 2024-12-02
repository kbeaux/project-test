export enum PropertyCategory {
  COMMERCIAL = 'COMMERCIAL',
  OFFICE = 'OFFICE',
  RETAIL = 'RETAIL',
  BUSINESS = 'Business',
  RESIDENTIAL = 'Residential',
  APARTMENT = 'Apartment',
  HOUSE = 'House',
}

export enum TransactionType {
  SALE = 'SALE',
  RENT = 'RENT',
  TRANSFER = 'TRANSFER',
  CESSION_DE_BAIL = 'CessionDeBail',
  VENTE = 'Vente',
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
  APARTMENT: {
    APARTMENT: 'APARTMENT',
    LOFT: 'LOFT',
  },
  HOUSE: {
    HOUSE: 'HOUSE',
    HOTEL_PARTICULIER: 'HOTEL_PARTICULIER',
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

export const HEATING_MODE = {
  INDIVIDUAL: 'INDIVIDUAL',
  SEMI: 'SEMI',
} as const;

export const HEATING_TYPE = {
  RADIATOR: 'RADIATOR',
  CONVECTOR: 'CONVECTOR',
  BOILER: 'BOILER',
} as const;

export const HEATING_ENERGY = {
  ELECTRIC: 'ELECTRIC',
  FUEL: 'FUEL',
} as const;

export const PROPERTY_STATE = {
  VERY_GOOD: 'VERY_GOOD',
  GOOD: 'GOOD',
  CORRECT: 'CORRECT',
} as const;

export const EXPOSURE = {
  NORTH: 'NORTH',
  SOUTH: 'SOUTH',
  EAST: 'EAST',
  WEST: 'WEST',
  SOUTH_EAST: 'SOUTH_EAST',
  SOUTH_WEST: 'SOUTH_WEST',
} as const;

export const ROOM_TYPES = {
  KITCHEN: 'KITCHEN',
  LIVING_ROOM: 'LIVING_ROOM',
  DINING_ROOM: 'DINING_ROOM',
  BEDROOM: 'BEDROOM',
  BATHROOM: 'BATHROOM',
  SHOWER_ROOM: 'SHOWER_ROOM',
  WC: 'WC',
  ENTRANCE: 'ENTRANCE',
  OFFICE: 'OFFICE',
  BALCONY: 'BALCONY',
  TERRACE: 'TERRACE',
  CELLAR: 'CELLAR',
  GARAGE: 'GARAGE',
} as const;

export const PROPERTY_LOCATION = {
  SEASIDE: 'BMER',      // Bord de mer
  CITY_CENTER: 'CVIL',  // Centre-ville
  PORT: 'PORT',         // Port
} as const;

export const VIEW_TYPES = {
  SEA: 'MER',           // Vue mer
  FOREST: 'FORE',       // Vue forêt
  MONUMENT: 'MONU',     // Vue monument
} as const;

export const DOCUMENT_TYPES = {
  IMAGE: 'Image',
  VIRTUAL_VISIT: 'VirtualVisit360',
} as const;

export const PROPERTY_FEATURES = {
  ELEVATOR: 'Ascenseur',
  CARETAKER: 'Gardien',
  DISABLED_ACCESS: 'AccesPMR',
  FURNISHED: 'IsMeuble',
  MIXED_USE: 'UsageMixte',
} as const;

export const PARKING_TYPES = {
  GARAGE: 'Garage',
  EXTERNAL: 'ParkingExt',
  INTERNAL: 'ParkingInt',
} as const;

export const PAYMENT_PERIODS = {
  MONTHLY: 'Month',
  QUARTERLY: 'Quarter',
  ANNUAL: 'Year',
} as const;

export const BUILDING_STATES = {
  VERY_GOOD: 'TresBonEtat',
  GOOD: 'BonEtat',
  CORRECT: 'Correct',
} as const;

export const BUILDING_MATERIALS = {
  CONCRETE: 'Beton',
  PAINTED_CONCRETE: 'BetonPeint',
  STONE: 'PierreDeTaille',
} as const;

export const ROOF_TYPES = {
  TILE: 'Tuile',
  SLATE: 'Ardoise',
} as const;

export const CONTACT_TYPES = {
  PHONE: 'Phone',
  MOBILE: 'Mobile',
  FAX: 'Fax',
  EMAIL: 'Email',
  WEB: 'Internet',
} as const;

export const AGENT_STATUS = {
  INDEPENDENT: 'independent',
  EMPLOYEE: 'employee',
} as const;

export const CONTACT_TITLES = {
  MR: 'Mr',
  MRS: 'Mme',
  MS: 'Mlle',
} as const;

export const DPE_LETTERS = {
  A: 'A',
  B: 'B',
  C: 'C',
  D: 'D',
  E: 'E',
  F: 'F',
  G: 'G',
} as const;

export const DPE_STATUS = {
  SUBMITTED: 'submitted',
  NOT_SUBMITTED: 'non_soumis',
  BLANK: 'vierge',
} as const;

export const CURRENCY = {
  EUR: 'EUR',
  USD: 'USD',
} as const;

export const VAT_MODES = {
  INCLUDING_TAXES: 'IncludingTaxes',
  EXCLUDING_TAXES: 'ExcludingTaxes',
} as const;

export const FEES_PAYMENT_BY = {
  BUYER: 'Buyer',
  SELLER: 'Seller',
  BOTH: 'Both',
} as const;

export const KITCHEN_TYPES = {
  SEPARATE: 'SEP',
  OPEN_PLAN: 'US',      // US = US Kitchen (Cuisine américaine)
} as const;

export const KITCHEN_EQUIPMENT = {
  EQUIPPED: 'EQU',      // Équipée
  SEMI_EQUIPPED: 'SEMI', // Semi-équipée
  NOT_EQUIPPED: 'NONE',  // Non équipée
} as const;

export const PROPERTY_AGE = {
  NEW: 'Neuf',
  RECENT: 'Recent',
  OLD: 'Ancien',
} as const;

export const PROPERTY_STANDING = {
  LUXURY: 'GrandStanding',
  STANDARD: 'Standard',
  BASIC: 'Correct',
} as const;

export const PROPERTY_STYLE = {
  MODERN: 'Modern',
  TRADITIONAL: 'Traditional',
  CONTEMPORARY: 'Contemporary',
} as const;

export const COUNTRY_CODES = {
  FRANCE: 'FR',
  BELGIUM: 'BE',
  // Ajouter d'autres pays selon les besoins
} as const;

export const ADDRESS_COMPONENTS = {
  STREET_NUMBER: 'VoieNumber',
  STREET_NAME: 'VoieName',
  POSTAL_CODE: 'Zipcode',
  CITY: 'ZipcodeCity',
  RICH_CITY: 'CityRichTypo',
  ALT_CODE: 'AltCode',
} as const;

export const MANDATE_STATUS = {
  ACTIVE: 'active',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  SUSPENDED: 'suspended',
} as const;

export const MANDATE_PERIODS = {
  INITIAL: 'initial',
  EXTENDED: 'extended',
} as const;

export const PUBLICATION_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
  DELETED: 'deleted',
} as const;

export const VISIBILITY_OPTIONS = {
  PUBLIC: 'public',
  PRIVATE: 'private',
  NETWORK: 'network',
} as const;
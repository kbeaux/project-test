import { PropertyCategory, TransactionType, PROPERTY_TYPES } from '../../property/constants/property.constants';

export class PropertyXmlDto {
  ID: string;
  displayRef: string;
  ref: string;
  DateMAJ: string;
  Category: PropertyCategory;
  Type: string;
  TransactionType: TransactionType;
  Surface: number;
  SurfaceTotale: number;

  // Prix et frais
  SoldPrice?: {
    _: number;
    currency: string;
  };
  RentalPrice?: {
    period: string;
    RentExclCharges?: {
      amount?: Array<{
        _: number;
        currency: string;
        vatMode: string;
      }>;
    };
  };
  AgencyFees?: {
    paidBy: string;
    BuyerFees?: {
      amount?: Array<{
        _: number;
        currency: string;
        vatMode: string;
      }>;
    };
  };

  // Informations du mandat
  MandatNum: string;
  MandatBeginDate: string;
  MandatEndDate: string;
  MandatEndFirstPeriodDate: string;
  IsExclusif: {
    _: string;
    CoExclu: string;
    SemiExclu: string;
  };

  // Adresse et localisation
  BienAddress?: {
    VoieNumber?: string;
    VoieName?: string;
    Zipcode: number;
    ZipcodeCity: string;
    CityRichTypo: string;
    AltCode?: string;
    country: string;
    lat?: number;
    long?: number;
  };
  Proximity?: string;
  Nearby?: Array<{
    type: string;
    dist: string;
    _: string;
  }>;

  // Caractéristiques du bien
  Anciennete?: string;
  ConstructionYear?: number;
  Standing?: string;
  Prestige?: boolean;
  Favorite?: boolean;
  Exposition?: string;
  Vue?: {
    type: string;
  };
  Situation?: string;

  // Détails de l'immeuble
  ConstructionNbFloors?: number;
  IsCopro?: boolean;
  CoproNbLots?: number;
  CoproFees?: {
    _: number;
    currency: string;
  };
  CoproIsProcedure?: boolean;

  // Détails de l'appartement
  ApptNumFloor?: number;
  ApptNbLevels?: number;
  NbRooms?: number;
  NbChbs?: number;
  NbSallesEau?: number;
  NbWC?: number;
  KitchenType?: string;
  KitchenFitting?: string;
  NbParkings?: number;

  // Chauffage et équipements
  Chauffage?: {
    Mode: string;
    Equipement: string;
    Energie: string;
  };
  IsMeuble?: boolean;
  Ascenseur?: boolean;
  AccesPMR?: boolean;
  Gardien?: boolean;
  TerrasBalcon?: boolean;
  NbTerrasse?: number;
  NbBalcon?: number;

  // DPE
  DPE?: {
    dateDiagnostic: string;
    non_soumis: boolean;
    vierge: boolean;
    PE: number;
    PE_letter: string;
    GES: number;
    GES_letter: string;
    AnnualEnergyCostsLowRange?: {
      amount: {
        _: number;
        currency: string;
      };
    };
    AnnualEnergyCostsHighRange?: {
      amount: {
        _: number;
        currency: string;
      };
    };
    CostEstimateBaseYear?: number;
  };

  // Pièces
  Room?: Array<{
    type: string;
    surface?: number;
    description?: string;
    level?: number;
  }>;

  // Documents et images
  Documents?: {
    Document?: {
      Filename: string;
      type: string;
      format?: string;
      md5?: string;
      Title?: string;
    } | Array<{
      Filename: string;
      type: string;
      format?: string;
      md5?: string;
      Title?: string;
    }>;
  };

  // Contact
  BienContact?: {
    ID: string;
    externRef: string;
    Title?: string;
    FName?: string;
    LName?: string;
    Phone?: Array<{
      type: string;
      _text: string;
    }> | string;
    Email?: string;
    RSAC?: string;
    is_independant: string;
    Address?: {
      VoieNumber?: string;
      VoieName?: string;
      Zipcode?: string;
      ZipcodeCity?: string;
      country?: string;
    };
  };

  // Descriptions
  Descriptions?: {
    Description?: {
      _: string;
      lang: string;
    } | Array<{
      _: string;
      lang: string;
    }>;
  };
}
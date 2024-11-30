import { PropertyCategory, TransactionType } from '../../property/constants/property.constants';

export class PropertyXmlDto {
  ID: string;
  displayRef: string;
  ref: string;
  Category: string;
  Type: string;
  TransactionType: string;
  Surface: number;
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
  BienAddress?: {
    Zipcode: number;
    CityRichTypo: string;
  };
  Documents?: {
    Document?: {
      Filename: string;
      type: string;
    } | Array<{
      Filename: string;
      type: string;
    }>;
  };
  Descriptions?: {
    Description?: {
      _: string;
      lang: string;
    };
  };
}
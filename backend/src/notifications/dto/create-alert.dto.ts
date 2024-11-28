import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsEnum, IsOptional } from 'class-validator';
import { PropertyCategory, TransactionType } from '../../property/constants/property.constants';

export class AlertCriteriaDto {
  @ApiProperty({ enum: PropertyCategory, required: false })
  @IsOptional()
  @IsEnum(PropertyCategory)
  category?: PropertyCategory;

  @ApiProperty({ enum: TransactionType, required: false })
  @IsOptional()
  @IsEnum(TransactionType)
  transactionType?: TransactionType;

  @ApiProperty({ required: false })
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  zipCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  surfaceMin?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  surfaceMax?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  priceMin?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  priceMax?: number;
}

export class CreateAlertDto {
  @ApiProperty({ type: AlertCriteriaDto })
  @IsObject()
  criteria: AlertCriteriaDto;

  @ApiProperty({ enum: ['daily', 'weekly'] })
  @IsEnum(['daily', 'weekly'])
  frequency: 'daily' | 'weekly';
}
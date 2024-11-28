import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyCategory, TransactionType } from '../constants/property.constants';

export class LocationDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}

export class EstimateDto {
  @ApiProperty({ enum: PropertyCategory })
  @IsString()
  @IsNotEmpty()
  category: PropertyCategory;

  @ApiProperty({ enum: TransactionType })
  @IsString()
  @IsNotEmpty()
  transactionType: TransactionType;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  surface: number;

  @ApiProperty({ type: LocationDto })
  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsEmail, IsUrl, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AgencyLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  lat: number;

  @ApiProperty()
  @IsNotEmpty()
  lng: number;
}

export class AgencyAddressDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  voieNumber: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  voieName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cityRichTypo: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => AgencyLocationDto)
  location?: AgencyLocationDto;
}

export class CreateAgencyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  externRef: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  commercialName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  corporateName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  siret: string;

  @ApiProperty({ type: AgencyAddressDto })
  @ValidateNested()
  @Type(() => AgencyAddressDto)
  address: AgencyAddressDto;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  website?: string;

  @ApiProperty({ type: [String], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  specialties?: string[];
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class SharePropertyDto {
  @ApiProperty()
  @IsString()
  propertyId: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  recipientEmail?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({ enum: ['email', 'facebook', 'twitter', 'linkedin'], required: false })
  @IsEnum(['email', 'facebook', 'twitter', 'linkedin'])
  @IsOptional()
  platform?: 'email' | 'facebook' | 'twitter' | 'linkedin';
}
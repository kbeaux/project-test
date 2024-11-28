import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Agency } from '../../agency/entities/agency.entity';
import { PropertyCategory, TransactionType } from '../constants/property.constants';

@Entity()
export class Property {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  displayRef: string;

  @ApiProperty()
  @Column()
  ref: string;

  @ApiProperty({ enum: PropertyCategory })
  @Column({
    type: 'enum',
    enum: PropertyCategory,
  })
  category: PropertyCategory;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty({ enum: TransactionType })
  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  transactionType: TransactionType;

  @ApiProperty()
  @Column('decimal')
  surface: number;

  @ApiProperty()
  @Column('decimal')
  price: number;

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  rentalPrice: {
    period: 'MONTHLY' | 'ANNUAL';
    amount: number;
    currency: string;
  };

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  agencyFees: {
    paidBy: 'OWNER' | 'TENANT';
    amount: number;
  };

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  heating: {
    type: string;
  };

  @ApiProperty()
  @Column('jsonb')
  location: {
    address: string;
    city: string;
    zipCode: string;
    latitude: number;
    longitude: number;
  };

  @ApiProperty()
  @Column('text', { array: true })
  images: string[];

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @Column('text', { array: true })
  features: string[];

  @ApiProperty({ type: () => Agency })
  @ManyToOne(() => Agency, agency => agency.properties)
  agency: Agency;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
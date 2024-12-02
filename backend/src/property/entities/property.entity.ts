import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Agency } from '../../agency/entities/agency.entity';
import { PropertyCategory, TransactionType } from '../constants/property.constants';
import { Room } from './room.entity';
import { Document } from './document.entity';
import { Address } from './address.entity';
import { Contact } from './contact.entity';

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

  @ApiProperty()
  @Column({ nullable: true })
  mandatNum: string;

  @ApiProperty()
  @Column({ nullable: true })
  mandatBeginDate: Date;

  @ApiProperty()
  @Column({ nullable: true })
  mandatEndDate: Date;

  @ApiProperty()
  @Column({ nullable: true })
  mandatEndFirstPeriodDate: Date;

  @ApiProperty()
  @Column('jsonb', { 
    nullable: true,
    default: {
      isExclusive: false,
      isCoExclusive: false,
      isSemiExclusive: false
    }
  })
  mandatInfo: {
    isExclusive: boolean;
    isCoExclusive: boolean;
    isSemiExclusive: boolean;
  };

  @ApiProperty({ type: () => Agency })
  @ManyToOne(() => Agency, agency => agency.properties)
  agency: Agency;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  dpe: {
    dateDiagnostic: Date;
    pe: number;
    pe_letter: string;
    ges: number;
    ges_letter: string;
    annualEnergyCosts: {
      lowRange: number;
      highRange: number;
      currency: string;
    };
    costEstimateBaseYear: number;
  };

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  condominium: {
    isCondominium: boolean;
    nbLots: number;
    fees: number;
    hasOngoingProcedures: boolean;
  };

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  exposure: {
    orientation: string[];
    views: string[];
  };

  @ApiProperty({ type: () => Room, isArray: true })
  @OneToMany(() => Room, room => room.property)
  rooms: Room[];

  @ApiProperty({ type: () => Document, isArray: true })
  @OneToMany(() => Document, document => document.property)
  documents: Document[];

  @ApiProperty({ type: () => Address })
  @OneToOne(() => Address, address => address.property)
  @JoinColumn()
  address: Address;

  @ApiProperty({ type: () => Contact, isArray: true })
  @OneToMany(() => Contact, contact => contact.property)
  contacts: Contact[];
}
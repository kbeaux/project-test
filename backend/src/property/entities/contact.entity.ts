import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Property } from './property.entity';

@Entity()
export class Contact {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  externRef: string;

  @ApiProperty()
  @Column({ nullable: true })
  title: string;

  @ApiProperty()
  @Column()
  firstName: string;

  @ApiProperty()
  @Column()
  lastName: string;

  @ApiProperty()
  @Column('jsonb', { 
    nullable: true,
    default: []
  })
  phones: {
    type: string;
    number: string;
  }[];

  @ApiProperty()
  @Column({ nullable: true })
  email: string;

  @ApiProperty()
  @Column({ nullable: true })
  rsac: string;

  @ApiProperty()
  @Column()
  isIndependent: boolean;

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  address: {
    streetNumber: string;
    streetName: string;
    zipCode: string;
    city: string;
    country: string;
  };

  @ApiProperty({ type: () => Property })
  @ManyToOne(() => Property, property => property.contacts)
  property: Property;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
} 
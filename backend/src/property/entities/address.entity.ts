import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Property } from './property.entity';

@Entity()
export class Address {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: true })
  streetNumber: string;

  @ApiProperty()
  @Column({ nullable: true })
  streetName: string;

  @ApiProperty()
  @Column()
  zipCode: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column({ nullable: true })
  cityRichTypo: string;

  @ApiProperty()
  @Column({ nullable: true })
  altCode: string;

  @ApiProperty()
  @Column()
  country: string;

  @ApiProperty()
  @Column('decimal', { nullable: true })
  latitude: number;

  @ApiProperty()
  @Column('decimal', { nullable: true })
  longitude: number;

  @ApiProperty()
  @Column('jsonb', { nullable: true })
  proximity: {
    type: string;
    distance: string;
    name: string;
  }[];

  @ApiProperty({ type: () => Property })
  @OneToOne(() => Property, property => property.address)
  property: Property;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
} 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Property } from '../../property/entities/property.entity';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Agency {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  externRef: string;

  @ApiProperty()
  @Column()
  commercialName: string;

  @ApiProperty()
  @Column()
  corporateName: string;

  @ApiProperty()
  @Column({ unique: true })
  siret: string;

  @ApiProperty()
  @Column('jsonb')
  address: {
    country: string;
    voieNumber: string;
    voieName: string;
    zipCode: string;
    cityRichTypo: string;
    location?: {
      lat: number;
      lng: number;
    };
  };

  @ApiProperty()
  @Column({ nullable: true })
  phone?: string;

  @ApiProperty()
  @Column({ nullable: true })
  email?: string;

  @ApiProperty()
  @Column({ nullable: true })
  website?: string;

  @ApiProperty()
  @Column('text', { array: true, default: [] })
  specialties: string[];

  @ApiProperty({ type: () => User, isArray: true })
  @OneToMany(() => User, user => user.agency)
  users: User[];

  @ApiProperty({ type: () => Property, isArray: true })
  @OneToMany(() => Property, property => property.agency)
  properties: Property[];

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
}
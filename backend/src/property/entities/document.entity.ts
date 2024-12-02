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
export class Document {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  type: string;

  @ApiProperty()
  @Column()
  format: string;

  @ApiProperty()
  @Column()
  filename: string;

  @ApiProperty()
  @Column({ nullable: true })
  title: string;

  @ApiProperty()
  @Column({ nullable: true })
  md5: string;

  @ApiProperty({ type: () => Property })
  @ManyToOne(() => Property, property => property.documents)
  property: Property;

  @ApiProperty()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn()
  updatedAt: Date;
} 
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class PropertyAlert {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  user: User;

  @Column('jsonb')
  criteria: {
    category?: string;
    transactionType?: string;
    city?: string;
    zipCode?: string;
    surfaceMin?: number;
    surfaceMax?: number;
    priceMin?: number;
    priceMax?: number;
  };

  @Column()
  frequency: 'daily' | 'weekly';

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  lastSentAt: Date;
}
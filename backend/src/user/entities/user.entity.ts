import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Agency } from '../../agency/entities/agency.entity';
import { Property } from '../../property/entities/property.entity';
import { USER_ROLES, USER_STATUS, USER_TITLES } from '../constants/user.constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  externRef: string;

  @Column()
  isIndependant: boolean;

  @Column()
  lastName: string;

  @Column()
  firstName: string;

  @Column({
    type: 'enum',
    enum: USER_TITLES,
    default: USER_TITLES.MR,
  })
  title: string;

  @Column()
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column('jsonb')
  address: {
    street: string;
    city: string;
    zipCode: string;
    country: string;
  };

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: USER_ROLES.AGENT,
  })
  role: string;

  @Column({
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.PENDING,
  })
  status: string;

  @Column({ nullable: true })
  pictureUrl?: string;

  @ManyToOne(() => Agency, agency => agency.users)
  agency: Agency;

  @ManyToMany(() => Property)
  @JoinTable({ name: 'user_favorites' })
  favorites: Property[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
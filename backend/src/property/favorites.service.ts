import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUserFavorites(userId: string): Promise<Property[]> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user.favorites;
  }

  async addToFavorites(userId: string, propertyId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    if (!user.favorites.some(fav => fav.id === propertyId)) {
      user.favorites.push(property);
      await this.userRepository.save(user);
    }
  }

  async removeFromFavorites(userId: string, propertyId: string): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.favorites = user.favorites.filter(fav => fav.id !== propertyId);
    await this.userRepository.save(user);
  }
}
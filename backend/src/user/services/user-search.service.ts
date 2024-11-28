import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserSearchService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async searchByName(query: string): Promise<User[]> {
    return this.userRepository.find({
      where: [
        { firstName: Like(`%${query}%`) },
        { lastName: Like(`%${query}%`) },
      ],
      relations: ['agency'],
    });
  }

  async searchByAgency(agencyId: string): Promise<User[]> {
    return this.userRepository.find({
      where: { agency: { id: agencyId } },
      relations: ['agency'],
    });
  }

  async searchByRole(role: string): Promise<User[]> {
    return this.userRepository.find({
      where: { role },
      relations: ['agency'],
    });
  }
}
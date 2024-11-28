import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserValidationService } from './user-validation.service';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userValidationService: UserValidationService,
  ) {}

  async updateProfile(userId: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      relations: ['agency'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    if (updateUserDto.phone || updateUserDto.address) {
      this.userValidationService.validateUserUpdate(updateUserDto);
    }

    await this.userRepository.update(userId, updateUserDto);

    return this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['agency'],
    });
  }

  async updateContactInfo(
    userId: string,
    phone: string,
    email: string,
  ): Promise<User> {
    const user = await this.userRepository.findOne({ 
      where: { id: userId },
      relations: ['agency'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    this.userValidationService.validateContactInfo({ phone, email });

    await this.userRepository.update(userId, { phone, email });

    return this.userRepository.findOneOrFail({
      where: { id: userId },
      relations: ['agency'],
    });
  }
}
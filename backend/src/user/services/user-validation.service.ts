import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { validatePhoneNumber, validateAddress } from '../utils/user.utils';

@Injectable()
export class UserValidationService {
  validateCreateUserDto(createUserDto: CreateUserDto): void {
    this.validatePhone(createUserDto.phone);
    this.validateUserAddress(createUserDto.address);
  }

  validateUserUpdate(updateUserDto: UpdateUserDto): void {
    if (updateUserDto.phone) {
      this.validatePhone(updateUserDto.phone);
    }
    if (updateUserDto.address) {
      this.validateUserAddress(updateUserDto.address);
    }
  }

  validateContactInfo(data: { phone: string; email: string }): void {
    this.validatePhone(data.phone);
    this.validateEmail(data.email);
  }

  private validatePhone(phone: string): void {
    if (!validatePhoneNumber(phone)) {
      throw new BadRequestException('Invalid phone number format');
    }
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestException('Invalid email format');
    }
  }

  private validateUserAddress(address: CreateUserDto['address']): void {
    if (!validateAddress(address)) {
      throw new BadRequestException('Invalid address format');
    }
  }
}
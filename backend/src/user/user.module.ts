import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserProfileService } from './services/user-profile.service';
import { UserSearchService } from './services/user-search.service';
import { UserValidationService } from './services/user-validation.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    UserService,
    UserProfileService,
    UserSearchService,
    UserValidationService,
  ],
  exports: [UserService, UserProfileService, UserSearchService],
})
export class UserModule {}
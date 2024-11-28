import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FtpSyncService } from './ftp-sync.service';
import { Property } from '../property/entities/property.entity';
import { Agency } from '../agency/entities/agency.entity';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, Agency, User]),
  ],
  providers: [FtpSyncService],
  exports: [FtpSyncService],
})
export class FtpSyncModule {}
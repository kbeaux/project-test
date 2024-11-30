import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { FtpSyncService } from './ftp-sync.service';
import { Property } from "../property/entities/property.entity";
import { Agency } from "../agency/entities/agency.entity";
import { User } from "../user/entities/user.entity";
import { XmlSyncService } from "./xml-sync.service";
import { XmlSyncController } from "./xml-sync.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Property, Agency, User])],
  controllers: [XmlSyncController],
  providers: [XmlSyncService],
  exports: [XmlSyncService],
})
export class XmlSyncModule {}

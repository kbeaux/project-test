import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { FtpSyncService } from './ftp-sync.service';
import { Property } from "../property/entities/property.entity";
import { Agency } from "../agency/entities/agency.entity";
import { User } from "../user/entities/user.entity";
import { XmlSyncService } from "./xml-sync.service";
import { XmlSyncController } from "./xml-sync.controller";
import { Address } from "@/property/entities/address.entity";
import { Contact } from "@/property/entities/contact.entity";
import { Room } from "@/property/entities/room.entity";
import { Document } from "@/property/entities/document.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Property, Room, Document, Address, Contact, Agency]),
  ],
  controllers: [XmlSyncController],
  providers: [XmlSyncService],
  exports: [XmlSyncService],
})
export class XmlSyncModule {}

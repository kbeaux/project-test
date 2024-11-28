import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyController } from './property.controller';
import { PropertySearchController } from './controllers/property-search.controller';
import { PropertyService } from './services/property.service';
import { PropertySearchService } from './services/property-search.service';
import { PropertyValidationService } from './services/property-validation.service';
import { Property } from './entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  controllers: [PropertyController, PropertySearchController],
  providers: [
    PropertyService,
    PropertySearchService,
    PropertyValidationService,
  ],
  exports: [PropertyService, PropertySearchService],
})
export class PropertyModule {}
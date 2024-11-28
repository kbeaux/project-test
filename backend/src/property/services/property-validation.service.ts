import { Injectable } from '@nestjs/common';
import { SearchPropertyDto } from '../dto/search-property.dto';
import { validateSearchParams } from '../utils/validation.utils';

@Injectable()
export class PropertyValidationService {
  validateSearchCriteria(searchDto: SearchPropertyDto): void {
    validateSearchParams(searchDto);
  }
}
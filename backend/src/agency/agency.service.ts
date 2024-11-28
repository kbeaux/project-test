import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agency } from './entities/agency.entity';
import { CreateAgencyDto } from './dto/create-agency.dto';
import { UpdateAgencyDto } from './dto/update-agency.dto';

@Injectable()
export class AgencyService {
  constructor(
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
  ) {}

  async findAll(): Promise<Agency[]> {
    return this.agencyRepository.find({
      relations: ['users', 'properties'],
    });
  }

  async findOne(id: string): Promise<Agency> {
    const agency = await this.agencyRepository.findOne({
      where: { id },
      relations: ['users', 'properties'],
    });

    if (!agency) {
      throw new NotFoundException(`Agency with ID ${id} not found`);
    }

    return agency;
  }

  async findByExternRef(externRef: string): Promise<Agency> {
    const agency = await this.agencyRepository.findOne({
      where: { externRef },
      relations: ['users', 'properties'],
    });

    if (!agency) {
      throw new NotFoundException(`Agency with external reference ${externRef} not found`);
    }

    return agency;
  }

  async create(createAgencyDto: CreateAgencyDto): Promise<Agency> {
    // Check for existing agency with same externRef or siret
    const existingAgency = await this.agencyRepository.findOne({
      where: [
        { externRef: createAgencyDto.externRef },
        { siret: createAgencyDto.siret },
      ],
    });

    if (existingAgency) {
      throw new ConflictException(
        `Agency with externRef ${createAgencyDto.externRef} or siret ${createAgencyDto.siret} already exists`,
      );
    }

    const agency = this.agencyRepository.create(createAgencyDto);
    return this.agencyRepository.save(agency);
  }

  async update(id: string, updateAgencyDto: UpdateAgencyDto): Promise<Agency> {
    const agency = await this.findOne(id);

    // If updating externRef or siret, check for conflicts
    if (updateAgencyDto.externRef || updateAgencyDto.siret) {
      const existingAgency = await this.agencyRepository.findOne({
        where: [
          { externRef: updateAgencyDto.externRef },
          { siret: updateAgencyDto.siret },
        ],
      });

      if (existingAgency && existingAgency.id !== id) {
        throw new ConflictException(
          `Agency with externRef ${updateAgencyDto.externRef} or siret ${updateAgencyDto.siret} already exists`,
        );
      }
    }

    Object.assign(agency, updateAgencyDto);
    return this.agencyRepository.save(agency);
  }

  async remove(id: string): Promise<void> {
    const agency = await this.findOne(id);
    await this.agencyRepository.remove(agency);
  }

  async findByCity(city: string): Promise<Agency[]> {
    return this.agencyRepository
      .createQueryBuilder('agency')
      .where("agency.address->>'cityRichTypo' ILIKE :city", { city: `%${city}%` })
      .getMany();
  }

  async findByZipCode(zipCode: string): Promise<Agency[]> {
    return this.agencyRepository
      .createQueryBuilder('agency')
      .where("agency.address->>'zipCode' = :zipCode", { zipCode })
      .getMany();
  }

  async findNearby(lat: number, lng: number, radiusKm: number): Promise<Agency[]> {
    return this.agencyRepository
      .createQueryBuilder('agency')
      .where(
        `ST_DWithin(
          ST_MakePoint(CAST(agency.address->'location'->>'lng' AS FLOAT),
                      CAST(agency.address->'location'->>'lat' AS FLOAT)::geography),
          ST_MakePoint(:lng, :lat)::geography,
          :radius
        )`,
        { lat, lng, radius: radiusKm * 1000 } // Convert km to meters
      )
      .getMany();
  }
}
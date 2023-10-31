import { SickType } from '../../entities/sick/SickType';
import { SickTypeRepository } from '../../repositories/sick/SickTypeRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SickTypeService extends BaseService<SickType, SickTypeRepository> {
  constructor(@InjectRepository(SickType) repository: SickTypeRepository) {
    super(repository);
  }

  findByKey(key: number): Promise<SickType | null> {
    return this.repository.findOne({ key: key });
  }
}


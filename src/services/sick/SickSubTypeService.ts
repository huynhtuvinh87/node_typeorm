import { SickSubType } from '../../entities/sick/SickSubType';
import { SickSubTypeRepository } from '../../repositories/sick/SickSubTypeRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SickSubTypeService extends BaseService<SickSubType, SickSubTypeRepository> {
  constructor(@InjectRepository(SickSubType) repository: SickSubTypeRepository) {
    super(repository);
  }
}


import { Sick } from '../../entities/sick/Sick';
import { SickRepository } from '../../repositories/sick/SickRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SickService extends BaseService<Sick, SickRepository> {
  constructor(@InjectRepository(Sick) repository: SickRepository) {
    super(repository);
  }
}


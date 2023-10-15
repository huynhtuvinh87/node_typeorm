import { Phamarcy } from '../../entities/auth/Phamarcy';
import { PhamarcyRepository } from '../../repositories/user/PhamarcyRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class PhamarcyService extends BaseService<Phamarcy, PhamarcyRepository> {
  constructor(@InjectRepository(Phamarcy) repository: PhamarcyRepository) {
    super(repository);
  }
}

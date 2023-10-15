import { Office } from '../../entities/auth/Office';
import { OfficeRepository } from '../../repositories/user/OfficeRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class OfficeService extends BaseService<Office, OfficeRepository> {
  constructor(@InjectRepository(Office) repository: OfficeRepository) {
    super(repository);
  }
}

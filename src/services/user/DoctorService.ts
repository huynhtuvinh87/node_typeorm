import { Doctor } from '../../entities/auth/Doctor';
import { DoctorRepository } from '../../repositories/user/DoctorRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class DoctorService extends BaseService<Doctor, DoctorRepository> {
  constructor(@InjectRepository(Doctor) repository: DoctorRepository) {
    super(repository);
  }
}

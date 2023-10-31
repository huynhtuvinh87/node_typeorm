import { Medicine } from '../../entities/medicine/Medicine';
import { MedicineRepository } from '../../repositories/medicine/MedicineRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class MedicineService extends BaseService<Medicine, MedicineRepository> {
  constructor(@InjectRepository(Medicine) repository: MedicineRepository) {
    super(repository);
  }
}


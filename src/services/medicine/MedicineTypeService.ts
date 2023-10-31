import { MedicineType } from '../../entities/medicine/MedicineType';
import { MedicineTypeRepository } from '../../repositories/medicine/MedicineTypeRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class MedicineTypeService extends BaseService<MedicineType, MedicineTypeRepository> {
  constructor(@InjectRepository(MedicineType) repository: MedicineTypeRepository) {
    super(repository);
  }
}


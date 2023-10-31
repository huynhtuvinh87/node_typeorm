import { MedicineCategory } from '../../entities/medicine/MedicineCategory';
import { MedicineCategoryRepository } from '../../repositories/medicine/MedicineCategoryRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class MedicineCategoryService extends BaseService<MedicineCategory, MedicineCategoryRepository> {
  constructor(@InjectRepository(MedicineCategory) repository: MedicineCategoryRepository) {
    super(repository);
  }
}


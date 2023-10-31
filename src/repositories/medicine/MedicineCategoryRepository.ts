import { EntityRepository, Repository } from 'typeorm';
import { MedicineCategory } from '../../entities/medicine/MedicineCategory';
import { Service } from 'typedi';

@Service()
@EntityRepository(MedicineCategory)
export class MedicineCategoryRepository extends Repository<MedicineCategory> {}
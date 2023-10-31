import { EntityRepository, Repository } from 'typeorm';
import { MedicineType } from '../../entities/medicine/MedicineType';
import { Service } from 'typedi';

@Service()
@EntityRepository(MedicineType)
export class MedicineTypeRepository extends Repository<MedicineType> {}
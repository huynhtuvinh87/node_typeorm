import { EntityRepository, Repository } from 'typeorm';
import { Medicine } from '../../entities/medicine/Medicine';
import { Service } from 'typedi';

@Service()
@EntityRepository(Medicine)
export class MedicineRepository extends Repository<Medicine> {}
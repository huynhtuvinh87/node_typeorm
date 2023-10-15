import { EntityRepository, Repository } from 'typeorm';
import { Doctor } from '../../entities/auth/Doctor';
import { Service } from 'typedi';

@Service()
@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor> {}
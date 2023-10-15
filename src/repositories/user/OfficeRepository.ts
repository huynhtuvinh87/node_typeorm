import { EntityRepository, Repository } from 'typeorm';
import { Office } from '../../entities/auth/Office';
import { Service } from 'typedi';

@Service()
@EntityRepository(Office)
export class OfficeRepository extends Repository<Office> {}

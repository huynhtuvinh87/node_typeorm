import { EntityRepository, Repository } from 'typeorm';
import { SickType } from '../../entities/sick/SickType';
import { Service } from 'typedi';

@Service()
@EntityRepository(SickType)
export class SickTypeRepository extends Repository<SickType> {}
import { EntityRepository, Repository, TreeRepository } from 'typeorm';
import { SickSubType } from '../../entities/sick/SickSubType';
import { Service } from 'typedi';

@Service()
@EntityRepository(SickSubType)
export class SickSubTypeRepository extends Repository<SickSubType> {}
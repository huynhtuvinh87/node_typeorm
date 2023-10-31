import { EntityRepository, Repository, TreeRepository } from 'typeorm';
import { SickCategory } from '../../entities/sick/SickCategory';
import { Service } from 'typedi';

@Service()
@EntityRepository(SickCategory)
export class SickCategoryRepository extends Repository<SickCategory> {}
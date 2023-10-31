import { SickCategory } from '../../entities/sick/SickCategory';
import { SickCategoryRepository } from '../../repositories/sick/SickCategoryRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SickCategoryService extends BaseService<SickCategory, SickCategoryRepository> {
  constructor(@InjectRepository(SickCategory) repository: SickCategoryRepository) {
    super(repository);
  }
}


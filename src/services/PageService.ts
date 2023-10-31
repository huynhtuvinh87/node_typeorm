import { Page } from '../entities/Page';
import { PageRepository } from '../repositories/PageRepository';
import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class PageService extends BaseService<Page, PageRepository> {
  constructor(@InjectRepository(Page) repository: PageRepository) {
    super(repository);
  }
}


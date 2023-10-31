import { EntityRepository, Repository } from 'typeorm';
import { Page } from '../entities/Page';
import { Service } from 'typedi';

@Service()
@EntityRepository(Page)
export class PageRepository extends Repository<Page> {}
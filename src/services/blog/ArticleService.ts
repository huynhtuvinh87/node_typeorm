import { Article } from '../../entities/blog/Article';
import { ArticleRepository } from '../../repositories/blog/ArticleRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class ArticleService extends BaseService<Article, ArticleRepository> {
  constructor(@InjectRepository(Article) repository: ArticleRepository) {
    super(repository);
  }
}


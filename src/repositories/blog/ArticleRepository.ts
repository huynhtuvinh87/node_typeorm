import { EntityRepository, Repository } from 'typeorm';
import { Article } from '../../entities/blog/Article';
import { Service } from 'typedi';

@Service()
@EntityRepository(Article)
export class ArticleRepository extends Repository<Article> {}
import { EntityRepository, Repository, TreeRepository } from 'typeorm';
import { Category } from '../../entities/blog/Category';
import { Service } from 'typedi';

@Service()
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {}
export class CategoryTreeRepository extends TreeRepository<Category> {}
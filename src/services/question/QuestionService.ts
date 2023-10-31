import { Question } from '../../entities/question/Question';
import { QuestionRepository } from '../../repositories/question/QuestionRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class QuestionService extends BaseService<Question, QuestionRepository> {
  constructor(@InjectRepository(Question) repository: QuestionRepository) {
    super(repository);
  }

  getData(skip: number, take:number): Promise<[Question[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('question')
    .leftJoinAndSelect('question.user', 'user')
    .select(['question.id','question.content','question.createdAt', 'user.id', 'user.name']);   
    return queryBuilder.skip(skip).take(take).getManyAndCount();
  }
}


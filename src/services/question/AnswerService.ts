import { Answer } from '../../entities/question/Answer';
import { AnswerRepository } from '../../repositories/question/AnswerRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class AnswerService extends BaseService<Answer, AnswerRepository> {
  constructor(@InjectRepository(Answer) repository: AnswerRepository) {
    super(repository);
  }

  getData(skip: number, take:number, question:number): Promise<[Answer[], number]> {
    const queryBuilder = this.repository.createQueryBuilder('answer')
    .leftJoinAndSelect('answer.user', 'user')
    .leftJoinAndSelect('answer.question', 'question')
    .select([
      'answer.id',
      'answer.content',
      'answer.createdAt',
      'question.id',
      'question.content',
      'question.createdAt',
      'user.id', 
      'user.name'
    ]);   
    if (question) {
      queryBuilder.where('question.id = :question', { question: question});
    }
    return queryBuilder.skip(skip).take(take).getManyAndCount();
  }
}


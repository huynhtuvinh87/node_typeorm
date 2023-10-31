import { EntityRepository, Repository } from 'typeorm';
import { Answer } from '../../entities/question/Answer';
import { Service } from 'typedi';

@Service()
@EntityRepository(Answer)
export class AnswerRepository extends Repository<Answer> {}
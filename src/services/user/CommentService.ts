import { Comment } from '../../entities/Comment';
import { CommentRepository } from '../../repositories/user/CommentRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class CommentService extends BaseService<Comment, CommentRepository> {
  constructor(@InjectRepository(Comment) repository: CommentRepository) {
    super(repository);
  }
}

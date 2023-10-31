import { Session } from '../entities/auth/Session';
import { SessionRepository } from '../repositories/SessionRepository';
import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SessionService extends BaseService<Session, SessionRepository> {
  constructor(@InjectRepository(Session) repository: SessionRepository) {
    super(repository);
  }

  deleteByToken(payload: string) {
    return this.repository.delete({ payload: payload });
  }

}


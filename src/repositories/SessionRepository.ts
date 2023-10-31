import { EntityRepository, Repository } from 'typeorm';
import { Session } from '../entities/auth/Session';
import { Service } from 'typedi';

@Service()
@EntityRepository(Session)
export class SessionRepository extends Repository<Session> {}
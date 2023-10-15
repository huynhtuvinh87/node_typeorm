import { EntityRepository, Repository } from 'typeorm';
import { Phamarcy } from '../../entities/auth/Phamarcy';
import { Service } from 'typedi';

@Service()
@EntityRepository(Phamarcy)
export class PhamarcyRepository extends Repository<Phamarcy> {}

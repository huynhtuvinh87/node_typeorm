import { EntityRepository, Repository } from 'typeorm';
import { Sick } from '../../entities/sick/Sick';
import { Service } from 'typedi';

@Service()
@EntityRepository(Sick)
export class SickRepository extends Repository<Sick> {}
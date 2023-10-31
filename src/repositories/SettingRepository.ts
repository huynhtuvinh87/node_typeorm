import { EntityRepository, Repository } from 'typeorm';
import { Setting } from '../entities/Setting';
import { Service } from 'typedi';

@Service()
@EntityRepository(Setting)
export class SettingRepository extends Repository<Setting> {}
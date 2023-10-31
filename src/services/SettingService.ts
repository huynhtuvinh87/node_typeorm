import { Setting } from '../entities/Setting';
import { SettingRepository } from '../repositories/SettingRepository';
import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class SettingService extends BaseService<Setting, SettingRepository> {
  constructor(@InjectRepository(Setting) repository: SettingRepository) {
    super(repository);
  }
}


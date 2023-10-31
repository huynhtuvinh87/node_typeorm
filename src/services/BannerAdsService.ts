import { BannerAds } from '../entities/BannerAds';
import { BannerAdsRepository } from '../repositories/BannerAdsRepository';
import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class BannerAdsService extends BaseService<BannerAds, BannerAdsRepository> {
  constructor(@InjectRepository(BannerAds) repository: BannerAdsRepository) {
    super(repository);
  }
}


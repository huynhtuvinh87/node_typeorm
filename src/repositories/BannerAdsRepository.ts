import { EntityRepository, Repository } from 'typeorm';
import { BannerAds } from '../entities/BannerAds';
import { Service } from 'typedi';

@Service()
@EntityRepository(BannerAds)
export class BannerAdsRepository extends Repository<BannerAds> {}
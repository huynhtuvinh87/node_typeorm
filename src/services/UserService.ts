import { User } from '../entities/auth/User';
import { UserRepository } from '../repositories/user/UserRepository';
import { BaseService } from './BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class UserService extends BaseService<User, UserRepository> {
  constructor(@InjectRepository(User) repository: UserRepository) {
    super(repository);
  }

  findByFirstName(name: string): Promise<User | null> {
    return this.repository.findOne({ name: name });
  }

  getCustomerUsers(): Promise<User[]> {
    return this.repository.getCustomerUsers();
  }

  getServiceUsers(): Promise<User[]> {
    return this.repository.getServiceUser();
  }

  getRangeServiceUser(lat: number, long: number, range: number = 1000): Promise<User[]> {
    return this.repository.getRangeServices(lat, long, range);
  }

  findByUserName(username: string): Promise<User | null> {
    return this.repository.findOne({ username: username });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ email: email });
  }

  findByPhone(phone: string): Promise<User | null> {
    return this.repository.findOne({ phone: phone });
  }

  getDataDoctor(params:any) {
    const queryBuilder = this.repository.createQueryBuilder('user')
    .leftJoinAndSelect('user.doctor', 'doctor')
    .select([
      'user.username', 'user.name', 'user.id', 'user.phone', 'user.email', 'user.money', 'user.coin_ads', 'user.verifyCode', 'user.createdAt', 'user.address',
      'doctor.certificate_file', 'doctor.logo', 'doctor.banner_cover', 'doctor.account_plus', 'doctor.money_ads', 'doctor.about', 'doctor.infor_contact',
       'doctor.view', 'doctor.like', 'doctor.favorite', 'doctor.rate_star', 'doctor.status', 'doctor.id'
    ]).where('user.role = "doctor"');
    if (params.status) {
      queryBuilder.where('doctor.status = :status', { status: Number(params.status)});
    }
    if (params.keyword) {
      queryBuilder.where('user.name LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
      queryBuilder.orWhere('user.username LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
      queryBuilder.orWhere('user.email LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
      queryBuilder.orWhere('user.phone LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
    }
    return queryBuilder.skip(Number(params.skip)).take(Number(params.take)).getManyAndCount();
  }

  getDataOffice(params:any) {
    const queryBuilder = this.repository.createQueryBuilder('user')
    .leftJoinAndSelect('user.office', 'office')
    .select([
      'user.username', 'user.name', 'user.id', 'user.phone', 'user.email', 'user.money', 'user.coin_ads', 'user.verifyCode', 'user.createdAt', 'user.address',
      'office.certificate_file', 'office.logo', 'office.banner_cover', 'office.account_plus', 'office.money_ads', 'office.about', 'office.infor_contact',
       'office.view', 'office.like', 'office.favorite', 'office.rate_star', 'office.status', 'office.id'
    ]).where('user.role = "office"');
    if (params.status) {
      queryBuilder.where('office.status = :status', { status: Number(params.status)});
    }
    if (params.keyword) {
      queryBuilder.where('user.name LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
      queryBuilder.orWhere('user.username LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
      queryBuilder.orWhere('user.email LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
      queryBuilder.orWhere('user.phone LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
    }
    return queryBuilder.skip(Number(params.skip)).take(Number(params.take)).getManyAndCount();
  }

  getDataPhamarcy(params:any) {
    const queryBuilder = this.repository.createQueryBuilder('user')
    .leftJoinAndSelect('user.phamarcy', 'phamarcy')
    .select([
      'user.username', 'user.name', 'user.id', 'user.phone', 'user.email', 'user.money', 'user.coin_ads', 'user.verifyCode', 'user.createdAt', 'user.address',
      'phamarcy.certificate_file', 'phamarcy.logo', 'phamarcy.banner_cover', 'phamarcy.account_plus', 'phamarcy.money_ads', 'phamarcy.about', 'phamarcy.infor_contact',
       'phamarcy.view', 'phamarcy.like', 'phamarcy.favorite', 'phamarcy.rate_star', 'phamarcy.status', 'phamarcy.id'
    ]).where('user.role = "phamarcy"');
    if (params.status) {
      queryBuilder.where('phamarcy.status = :status', { status: Number(params.status)});
    }
    if (params.keyword) {
      queryBuilder.where('user.name LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
      queryBuilder.orWhere('user.username LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
      queryBuilder.orWhere('user.email LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
      queryBuilder.orWhere('user.phone LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
    }
    return queryBuilder.skip(Number(params.skip)).take(Number(params.take)).getManyAndCount();
  }
}

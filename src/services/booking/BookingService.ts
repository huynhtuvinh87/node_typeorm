import { Booking } from '../../entities/booking/Booking';
import { BookingRepository } from '../../repositories/booking/BookingRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class BookingService extends BaseService<Booking, BookingRepository> {
  constructor(@InjectRepository(Booking) repository: BookingRepository) {
    super(repository);
  }

  getData(params:any) {
    const queryBuilder = this.repository.createQueryBuilder('booking')
    .leftJoinAndSelect('booking.user', 'user')
    .leftJoinAndSelect('booking.doctor', 'doctor')
    .leftJoinAndSelect('booking.category', 'category')
    .select([
      'booking.id',
      'booking.title',
      'booking.description',
      'booking.date_time',
      'booking.status',
      'user.id',
      'user.name',
      'doctor.id',
      'doctor.name',
      'category.id',
      'category.title'
    ]);
    if (params.status) {
      queryBuilder.where('booking.status = :status', { status: Number(params.status)});
    }
    if (params.category) {
      queryBuilder.where('category.id = :category', { category: Number(params.category)});
    }
    if (params.user) {
      queryBuilder.where('user.id = :user', { user: Number(params.user)});
    }
    if (params.doctor) {
      queryBuilder.where('doctor.id = :doctor', { doctor: Number(params.doctor)});
    }
    if (params.keyword) {
      queryBuilder.where('booking.title LIKE :searchTerm', { searchTerm: `%${params.keyword}%` });
    }
    return queryBuilder.skip(Number(params.skip)).take(Number(params.take)).getManyAndCount();
  }
}


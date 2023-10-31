import { EntityRepository, Repository } from 'typeorm';
import { BookingCategory } from '../../entities/booking/BookingCategory';
import { Service } from 'typedi';

@Service()
@EntityRepository(BookingCategory)
export class BookingCategoryRepository extends Repository<BookingCategory> {}
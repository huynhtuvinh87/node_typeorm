import { BookingCategory } from '../../entities/booking/BookingCategory';
import { BookingCategoryRepository } from '../../repositories/booking/BookingCategoryRepository';
import { BaseService } from '../BaseService';
import { Service } from 'typedi';
import { InjectRepository } from 'typeorm-typedi-extensions';

@Service()
export class BookingCategoryService extends BaseService<BookingCategory, BookingCategoryRepository> {
  constructor(@InjectRepository(BookingCategory) repository: BookingCategoryRepository) {
    super(repository);
  }
}


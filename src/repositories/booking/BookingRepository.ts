import { EntityRepository, Repository } from 'typeorm';
import { Booking } from '../../entities/booking/Booking';
import { Service } from 'typedi';

@Service()
@EntityRepository(Booking)
export class BookingRepository extends Repository<Booking> {}
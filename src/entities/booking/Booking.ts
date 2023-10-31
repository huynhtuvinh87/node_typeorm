import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BookingCategory } from "./BookingCategory";
import { User } from "../../entities/auth/User";

@Entity({ name: 'bookings' })
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => BookingCategory, (category) => category.id)
  category: BookingCategory

  @ManyToOne((type) => User, (user) => user.id)
  user: User

  @ManyToOne((type) => User, (doctor) => doctor.id)
  doctor: User

  @Column({
    name: 'title',
    nullable: true,
  })
  title: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'date_time',
    nullable: true,
  })
  date_time: string;

  @Column({
    name: 'status',
    nullable: true,
  })
  status: boolean;

  @CreateDateColumn({
    name: 'created_at',
    nullable: false
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false
  })
  updatedAt: string;

  constructor(partial: Partial<Booking>) {
    super();
    Object.assign(this, partial);
  }
}

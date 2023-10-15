import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'bookings' })
export class Booking extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'booking_category_id',
    nullable: true,
  })
  booking_category_id: number;


  @Column({
    name: 'user_id',
    nullable: true,
  })
  user_id: number;

  @Column({
    name: 'doctor_id',
    nullable: true,
  })
  doctor_id: number;

  @Column({
    name: 'title',
    nullable: true,
  })
  title: string;

  @Column({
    name: 'decription',
    nullable: true,
  })
  decription: string;

  @Column({
    name: 'date',
    nullable: true,
  })
  date: string;

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

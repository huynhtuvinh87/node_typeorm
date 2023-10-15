import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './auth/User';

@Entity({ name: 'location' })
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  uuid: number

  @Column({
    name: 'lat',
    type: 'double precision',
    nullable: true,
  })
  lat: number;

  @Column({
    name: 'log',
    type: 'double precision',
    nullable: true,
  })
  log: number;

  @Column({
    name: 'address',
    nullable: false,
    length: 150
  })
  address: string;

  @Column('timestamp', {
    name: 'created_at',
    nullable: true
  })
  createdAt: string;

  @Column('timestamp', {
    name: 'updated_at',
    nullable: true
  })
  updatedAt: string;

  constructor(partial: Partial<Location>) {
    super();
    Object.assign(this, partial);
  }
}

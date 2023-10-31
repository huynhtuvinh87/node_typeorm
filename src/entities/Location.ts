import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'locations' })
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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

  constructor(partial: Partial<Location>) {
    super();
    Object.assign(this, partial);
  }
}

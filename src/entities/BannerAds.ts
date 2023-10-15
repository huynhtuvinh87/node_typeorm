import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './auth/User';

@Entity({ name: 'banner_ads' })
export class BannerAds extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'title',
    nullable: true,
  })
  title: string;

  @Column({
    name: 'photo',
    nullable: true,
  })
  photo: string;

  @Column({
    name: 'desciption',
    nullable: false,
  })
  desciption: string;

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

  constructor(partial: Partial<BannerAds>) {
    super();
    Object.assign(this, partial);
  }
}

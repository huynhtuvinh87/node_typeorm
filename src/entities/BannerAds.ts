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
    name: 'link',
    nullable: true,
  })
  link: string;

  @Column({
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'type',
    nullable: true,
  })
  type: number;

  @Column({
    name: 'order',
    nullable: true,
  })
  order: number;

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

  constructor(partial: Partial<BannerAds>) {
    super();
    Object.assign(this, partial);
  }
}

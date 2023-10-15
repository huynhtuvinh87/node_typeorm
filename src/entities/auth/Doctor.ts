import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './User';

@Entity({ name: 'doctors' })
export class Doctor extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Exclude()
  @Column({
    nullable: true,
  })
  certificate_file: string;

  @Column({
    nullable: true
  })
  logo: string;

  @Column({
    name: 'banner_cover',
    nullable: true,
  })
  banner_cover: string;

  // khi nguoi dung nap tien 
  @Column({
    name: 'account_plus',
    nullable: true,
  })
  accountPlus: boolean;

  @Column({
    name: 'money_ads',
    nullable: true,
    default : 0
  })
  money: number;

  // html 
  @Column({
    name: 'about',
    nullable: true,
  })
  about: string;

  @Column({
    name: 'infor_contact',
    nullable: true,
  })
  infor_contact: string;

  @Column({
    name: 'view',
    nullable: true,  default : 0
  })
  view: number;

  @Column({
    name: 'like',
    nullable: true,  default : 0
  })
  like: number;

  @Column({
    name: 'favorite',
    nullable: true,
    default: 0
  })
  favorite: number;

  @Column({
    name: 'rate_star',
    nullable: true, default: 0
  })
  rate_star: number;

  // admin approve account this doctor
  @Column({
    nullable: true, default: false
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
}

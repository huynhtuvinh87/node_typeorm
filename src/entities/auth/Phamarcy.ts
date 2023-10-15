
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './User';

@Entity({ name: 'phamarcys' })
export class Phamarcy extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id)
  user: User

  // admin approve account this doctor
  @Column({
    nullable: true,
    default: true
  })
  status: boolean;

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
    default: true
  })
  accountPlus: boolean;

  @Column({
    name: 'money_ads',
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
  inforContact: string;

  @Column({
    name: 'view',
    nullable: true,
  })
  view: number;


  @Column({
    name: 'like',
    nullable: true,
  })
  like: number;

  @Column({
    name: 'favorite',
    nullable: true,
  })
  favorite: number;

  @Column({
    name: 'rate_star',
    nullable: true,
  })
  rate_star: number;

  @CreateDateColumn({
    name: 'time_open',
    nullable: true
  })
  time_open: string;

  @CreateDateColumn({
    name: 'time_clock',
    nullable: true
  })
  time_clock: string;

  @CreateDateColumn({
    name: 'created_at',
    nullable: true
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true
  })
  updatedAt: string;

}

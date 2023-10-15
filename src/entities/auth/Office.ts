
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { User } from './User';

@Entity({ name: 'offices' })
export class Office extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.id)
  user: User

  // admin approve account this doctor
  @Column({
    nullable: true,
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
    nullable: true,
  })
  banner_cover: string;

  // khi nguoi dung nap tien 
  @Column({
    nullable: true,
  })
  account_plus: boolean;

  @Column({
    nullable: true,
  })
  money_ads: number;

  // html 
  @Column({
    name: 'about',
    nullable: true,
  })
  about: string;

  @Column({
    nullable: true,
  })
  infor_contact: string;

  @Column({
    nullable: true,
  })
  view: number;


  @Column({
    nullable: true,
  })
  like: number;

  @Column({
    nullable: true,
  })
  favorite: number;

  @Column({
    nullable: true,
  })
  rate_star: number;

  @CreateDateColumn({
    nullable: true
  })
  time_open: string;

  @CreateDateColumn({
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

import { Roles } from '../../consts/Roles';
import { Location } from '../Location';
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { Length, IsEmail } from "class-validator";
import { Doctor } from './Doctor';
import { Office } from './Office';
import { Phamarcy } from './Phamarcy';
// nullable: true Không required 
@Entity({ name: 'users' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 50,
  })
  username: string;

  @Exclude()
  @Column({
    length: 150,
  })
  @Length(4, 100)
  password: string;

  @Column({
    length: 10
  })
  role: Roles;

  @Column({
    name: 'name',
    nullable: true
  })
  name: string;

  @Column({
    name: 'email',
    nullable: true
  })
  email: string;

  @Column({
    name: 'phone',
    nullable: true
  })
  phone: string;

  @Column({
    name: 'device_token',
    nullable: true
  })
  device_token: string;

  @Column({
    name: 'avatar',
    nullable: true
  })
  avatar: string;

  @Column({
    name: 'banner_cover',
    nullable: true
  })
  banner_profile: string;

  @Column({
    name: 'code',
    length: 4,
    nullable: true
  })
  code: string;

  @Column({
    name: 'verify',
    default: false,
    nullable: true
  })
  verifyCode: boolean;

  // khi nguoi dung nap tien 
  @Column({
    name: 'account_plus',
    default: false,
    nullable: true
  })
  account_plus: boolean;

  @Column({
    name: 'coin_view_ads_video',
    nullable: true
  })
  coin_ads: number;

  @Column({
    name: 'money_ads',
    nullable: true
  })
  money: number;

  @OneToOne(() => Location, { cascade: true, primary: false })
  @JoinColumn()
  address: Location;

  @OneToOne(() => Doctor, { cascade: true, primary: false })
  @JoinColumn()
  doctor: Doctor;

  @OneToOne(() => Office, { cascade: true, primary: false })
  @JoinColumn()
  office: Office;

  @OneToOne(() => Phamarcy, { cascade: true, primary: false })
  @JoinColumn()
  phamarcy: Phamarcy;

  // option social 
  @Column({
    name: 'facebook_id',
    nullable: true
  })
  facebookId: string;

  @Column({
    name: 'google_id',
    nullable: true
  })
  googleId: string;

  @Column({
    name: 'apple_id',
    nullable: true
  })
  appleId: string;

  @Column('timestamp', {
    nullable: true
  })
  emailVerifiedAt: string;

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

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  // @Expose()
  // get fullName(): string {
  //   return `${this.firstName} ${this.lastName}`;
  // }
}

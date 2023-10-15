
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'settings' })
export class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    nullable: true,
  })
  site_name: string;

  @Column({
    nullable: true,
  })
  site_url: string;

  @Column({
    nullable: true,
  })
  site_email: string;

  @Column({
    nullable: true,
  })
  google_analytics_active: string;

  @Column({
    nullable: true,
  })
  google_analytics_code: string;

  @Column({
    nullable: true,
  })
  logo: string;

  @Column({
    nullable: true,
  })
  favicon: string;

  @Column({
    nullable: true,
  })
  meta_title: string;

  @Column({
    nullable: true,
  })
  meta_description: string;

  @Column({
    nullable: true,
  })
  facebook_active: string;

  @Column({
    nullable: true,
  })
  facebook_api_key: string;

  @Column({
    nullable: true
  })
  facebook_api_secret: string;

  @Column({
    nullable: true
  })
  facebook_redirect_url: string;

  @Column({
    nullable: true,
  })
  google_active: string;

  @Column({
    nullable: true,
  })
  google_api_key: string;

  @Column({
    nullable: true
  })
  google_api_secret: string;

  @Column({
    nullable: true
  })
  google_redirect_url: string;

  @Column({
    nullable: true,
  })
  twitter_active: string;

  @Column({
    nullable: true,
  })
  twitter_api_key: string;

  @Column({
    nullable: true
  })
  twitter_api_secret: string;

  @Column({
    nullable: true
  })
  twitter_redirect_url: string;

  @Column({
    nullable: true,
  })
  smtp_host: string;

  @Column({
    nullable: true,
  })
  smtp_port: string;

  @Column({
    nullable: true
  })
  smtp_username: string;

  @Column({
    nullable: true
  })
  smtp_password: string;

  @Column({
    nullable: true,
  })
  smtp_email: string;

  @Column({
    nullable: true,
  })
  smtp_sender_name: string;

  @Column({
    nullable: true,
    length:10
  })
  smtp_encryption: string;

  @Column({
    nullable: true
  })
  openai_api_secret_1: string;

  @Column({
    nullable: true
  })
  openai_api_secret_2: string;

  @Column({
    nullable: true
  })
  openai_api_secret_3: string;

  @Column({
    nullable: true
  })
  openai_api_secret_4: string;

  @Column({
    nullable: true
  })
  openai_api_secret_5: string;


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

  constructor(partial: Partial<User>) {
    super();
    Object.assign(this, partial);
  }

  // @Expose()
  // get fullName(): string {
  //   return `${this.firstName} ${this.lastName}`;
  // }
}

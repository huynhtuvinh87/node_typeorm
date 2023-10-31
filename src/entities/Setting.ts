
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'settings' })
export class Setting extends BaseEntity {

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
  term_of_use: string;

  @Column({
    nullable: true,
  })
  introduction: string;

  @Column({
    nullable: true,
  })
  version: string;

  @Column({
    nullable: true,
  })
  google_analytics_active: boolean;

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
  apple_active: boolean;

  @Column({
    nullable: true,
  })
  apple_api_key: string;

  @Column({
    nullable: true
  })
  apple_api_secret: string;

  @Column({
    nullable: true
  })
  apple_redirect_url: string;

  @Column({
    nullable: true,
  })
  facebook_active: boolean;

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
  twitter_active: boolean;

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

  constructor(partial: Partial<Setting>) {
    super();
    Object.assign(this, partial);
  }
}

import {
  BaseEntity, Column, CreateDateColumn,
  Double, Entity, JoinColumn,
  ManyToOne, PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { SickCategory } from './SickCategory';
@Entity({ name: 'sicks' })
export class Sick extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'title',
    nullable: true,
  })
  title: string;

  @Column({
    name: 'slug',
    nullable: true,
  })
  slug: string;

  @ManyToOne((type) => SickCategory, (sickCategory) => sickCategory.id)
  sickCategory: SickCategory

  @Column({
    name: 'status',
    nullable: true,
  })
  status: boolean; // active / deactive

  @Column({
    name: 'gender',
    nullable: true,
  })
  gender: boolean; // Nam/ Nu 


  @Column({
    name: 'photo',
    nullable: true,
  })
  photo: string;

  // mô tả nội dung về bệnh nếu có 
  @Column('text' ,{
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column('text',{
    name: 'content',
    nullable: true,
  })
  content: string; // html 

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

  constructor(partial: Partial<Sick>) {
    super();
    Object.assign(this, partial);
  }
}

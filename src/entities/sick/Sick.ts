import { BaseEntity, Column, CreateDateColumn,
   Double, Entity, JoinColumn,
    ManyToOne, PrimaryGeneratedColumn,
     UpdateDateColumn 
    } from 'typeorm';

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
    name: 'sub_type_id',
    nullable: true,
  })
  subTypeId: number;

  @Column({
    name: 'sick_category_id',
    nullable: true,
  })
  categoryId: number;

  @Column({
    name: 'status',
    nullable: true,
    default: false
  })
  status: boolean; // active / deactive

  @Column({
    name: 'gender',
    nullable: true,
    default: false
  })
  gender: boolean; // Nam/ Nu 

  
  @Column({
    name: 'photo',
    nullable: true,
  })
  photo: string;

  // mô tả nội dung về bệnh nếu có 
  @Column({
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
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

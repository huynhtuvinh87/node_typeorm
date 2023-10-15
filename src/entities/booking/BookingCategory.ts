import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../auth/User';
import { TYPE_MEDICINE } from '../MedicineType';

// Khams bệnh từ xa 
// Xét nghiệm máu 
// Tư vấn bệnh 
// Chuẩn đoán mãu xét nghiêm 
// Chuẩn đoán chỉnh hình thông qua hình ảnh 
// chuẩn đoán và chăm sóc bệnh tại nhà 
@Entity({ name: 'booking_categories' })
export class BookingCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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
    name: 'slug',
    nullable: true,
  })
  slug: string;

  @Column({
    name: 'decription',
    nullable: true,
  })
  decription: string;

  @Column("text", {
    name: 'content',
    nullable: true,
  })
  content: string;

  @Column("text", {
    name: 'consulting_category',
    nullable: true,
  })
  consulting_category: string;

  @Column("text", {
    name: 'testing_category',
    nullable: true,
  })
  testing_category: string;

  @Column("text", {
    name: 'note',
    nullable: true,
  })
  note: string;

  @Column({
    name: 'status',
    nullable: false,
  })
  status: boolean;

  @Column({
    name: 'price',
    nullable: true,
  })
  price: number;

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

  constructor(partial: Partial<BookingCategory>) {
    super();
    Object.assign(this, partial);
  }
}

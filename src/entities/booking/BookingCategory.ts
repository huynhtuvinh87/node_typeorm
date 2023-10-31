import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SickCategory } from '../sick/SickCategory';

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

  @ManyToOne((type) => SickCategory, (sickCategory) => sickCategory.id)
  sickCategory: SickCategory

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

  @Column('text',{
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column("text", {
    name: 'consulting',
    nullable: true,
  })
  consulting: string;

  @Column("text", {
    name: 'testing',
    nullable: true,
  })
  testing: string;

  @Column({
    name: 'price',
    nullable: true,
  })
  price: number;

  @Column({
    name: 'status',
    nullable: false,
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

  constructor(partial: Partial<BookingCategory>) {
    super();
    Object.assign(this, partial);
  }
}

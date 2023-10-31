import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MedicineCategory } from './MedicineCategory';

@Entity({ name: 'medicines' })
export class Medicine extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => MedicineCategory, (medicineCategory) => medicineCategory.id)
  medicineCategory: MedicineCategory

  @Column({
    name: 'title',
    nullable: true,
  })
  title: string;

  @Column({
    name: 'icon',
    nullable: true,
  })
  icon: string;

  @Column({
    name: 'slug',
    nullable: true,
  })
  slug: string;


  @Column("text", {
    name: 'content',
    nullable: true,
  })
  content: string;

  @Column("text", {
    name: 'description',
    nullable: true,
  })
  description: string;


  @Column({
    name: 'status',
    nullable: true,
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

  constructor(partial: Partial<Medicine>) {
    super();
    Object.assign(this, partial);
  }
}

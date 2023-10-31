import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { MedicineType } from "./MedicineType";
@Entity({ name: 'medicine_categories' })
export class MedicineCategory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne((type) => MedicineType, (medicineType) => medicineType.id)
  medicineType: MedicineType


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

  constructor(partial: Partial<MedicineCategory>) {
    super();
    Object.assign(this, partial);
  }
}

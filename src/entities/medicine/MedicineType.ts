import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

// MEDICINE_MEDICINAL = 0, // Thuốc Nam 
// MEDICINE_TRADICTIONAL = 1, // thuốc tây 
// MEDICINE_FOLK = 2, // thuốc dân gian 
// MEDICINE_CHE_TRADICTIONAL = 3, // thuốc bắc 
// MEDICINE_DRUGS_TRADICTIONAL = 4,  // thuốc y học cổ truyền 
// MEDICINE_HEALING_TIPS = 5, // Thuốc Mẹo chữa bệnh 
// MEDICINE_ALL = 6 // Thuốc tổng hợp 
@Entity({ name: 'medicine_types' })
export class MedicineType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

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

  constructor(partial: Partial<MedicineType>) {
    super();
    Object.assign(this, partial);
  }
}

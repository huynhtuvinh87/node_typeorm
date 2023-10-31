import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
import { SickType } from "./SickType";
@Entity({ name: 'sick_categories' })
export class SickCategory extends BaseEntity {

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

  @Column({
    name: 'icon',
    nullable: true,
  })
  icon: string;

  @ManyToOne((type) => SickType, (sickType) => sickType.id)
  sickType: SickType

  // mô tả nội dung về bệnh nếu có 
  @Column({
    name: 'description',
    nullable: true,
  })
  description: string;

  @Column({
    name: 'status',
    nullable: true,
    default: false
  })
  status: boolean; // active / deactive

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

  constructor(partial: Partial<SickCategory>) {
    super();
    Object.assign(this, partial);
  }
}

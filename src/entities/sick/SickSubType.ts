import { BaseEntity, 
  Column, 
  CreateDateColumn, 
  Double, 
  Entity, 
  JoinColumn, 
  ManyToOne, 
  PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'sick_sub_types' })
export class SickSubType extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'title',
    nullable: true,
  })
  title: string;

  @Column({
    name: 'type_id',
    nullable: true,
  })
  typeId: number;

  // mô tả nội dung về bệnh nếu có 
  @Column({
    name: 'description',
    nullable: true,
  })
  description: string;

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

  constructor(partial: Partial<SickSubType>) {
    super();
    Object.assign(this, partial);
  }
}

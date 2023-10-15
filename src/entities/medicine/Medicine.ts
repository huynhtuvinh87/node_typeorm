import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'medicines' })
export class Medicine extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'medicine_type_id',
    nullable: false,
  })
  medicine_type_id: number;

  @Column({
    name: 'medicine_category_id',
    nullable: false,
  })
  medicine_category_id: number;

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

import { BaseEntity, Column, CreateDateColumn, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'product_categories' })
export class ProductCategory extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'parent_id',
    nullable: false,
  })
  parent_id: number;

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

  @Column('timestamp',{
    name: 'created_at',
    nullable: true
  })
  createdAt: string;

  @Column('timestamp',{
      name: 'updated_at',
      nullable: true
  })
  updatedAt: string;

  constructor(partial: Partial<ProductCategory>) {
    super();
    Object.assign(this, partial);
  }
}

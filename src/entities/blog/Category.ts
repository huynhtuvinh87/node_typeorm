import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import {
  IsBoolean,
  IsNotEmpty
} from "class-validator"

@Entity({ name: 'categories' })
export class Category extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number
  
  @Column({
    name: 'title',
    nullable: false,
  })
  @IsNotEmpty()
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
  @IsBoolean()
  status: boolean;

  @ManyToOne((type) => Category, (category) => category.children)
  parent: Category[]

  @OneToMany((type) => Category, (category) => category.parent)
  children: Category[]

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
}

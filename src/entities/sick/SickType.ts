import {
  BaseEntity, Column, CreateDateColumn, Entity,
  PrimaryGeneratedColumn, UpdateDateColumn
} from 'typeorm';
@Entity({ name: 'sick_types' })
export class SickType extends BaseEntity {

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

  @Column({
    name: 'key',
    nullable: false,
  })
  key: number;

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

  constructor(partial: Partial<SickType>) {
    super();
    Object.assign(this, partial);
  }
}

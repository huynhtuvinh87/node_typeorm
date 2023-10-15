import { BaseEntity, Column, CreateDateColumn, 
  Double, Entity, JoinColumn, ManyToOne, 
  PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

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
    name: 'icon',
    nullable: true,
  })
  icon: string;

  @Column({
    name: 'key',
    nullable: false,
  })
  key: number;

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

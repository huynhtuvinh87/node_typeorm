import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from './User';

@Entity({ name: 'sessions' })
export class Session extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @ManyToOne(() => User, user => user.id)
  user: User;

  @Column('text',{
    name: 'payload',
    nullable: true,
  })
  payload: string;

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

  constructor(partial: Partial<Session>) {
    super();
    Object.assign(this, partial);
  }
}

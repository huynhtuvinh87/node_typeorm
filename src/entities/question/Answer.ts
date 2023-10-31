import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "../auth/User";
import { Question } from './Question';

@Entity('answers')
export class Answer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @ManyToOne((type) => Question, (question) => question.id)
    question: Question[]

    @Column('text', {
        name: "content",
        nullable: false
    })
    content: string;

    @Column({
      name: "photo",
      nullable: true
    })
    photo: string;
    
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

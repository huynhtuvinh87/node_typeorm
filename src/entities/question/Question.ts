import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne, OneToMany } from "typeorm"
import { User } from "../auth/User";
import { Answer } from "./Answer";

@Entity('questions')
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @ManyToOne(() => User, user => user.id)
    user: User;

    @OneToMany(() => Answer, (answer) => answer.question)
    questions: Question[];

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

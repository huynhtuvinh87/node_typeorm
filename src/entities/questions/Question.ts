import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "../auth/User";
import { Comment } from '../Comment';

@Entity('question')
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    uuid: Number;

    @ManyToOne(() => User, user => user.comments)
    author: User;

    @Column({
        name: "medicine_type_id",
        nullable: false
    })
    medicine_type_id: number;

    @Column({
        name: "sick_category_id",
        nullable: false
    })
    sick_category_id: number;

    @Column({
        name: "sub_type_id",
        nullable: false
    })
    sub_type_id: number;

    @Column({
        name: "title",
        nullable: false

    })
    title: string;

    @Column({
        name: "content",
        nullable: false
    })
    content: string;

    @Column({
        name: "description",
        nullable: false
    })
    description: string;

    @OneToMany(() => Comment, (commet) => commet.author)
    comments: Comment[];

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

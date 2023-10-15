import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToOne, JoinColumn, ManyToOne } from "typeorm"
import { User } from "./auth/User";

@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    uuid: Number;

    @Column()
    rate: number;

    @Column({
        nullable: false
    })
    fileImage: string;

    @Column()
    comment: string;

    @ManyToOne(() => User, user => user.comments)
    author: User;

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
}

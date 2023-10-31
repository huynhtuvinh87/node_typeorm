import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from "typeorm"
import { User } from "./auth/User";

@Entity('comments')
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    rate: number;

    @Column({
        nullable: false
    })
    fileImage: string;

    @Column('text', {
        name: "content",
        nullable: false
    })
    content: string;

    @ManyToOne(() => User, user => user.id)
    user: User;

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

    constructor(partial: Partial<Comment>) {
        super();
        Object.assign(this, partial);
    }
}

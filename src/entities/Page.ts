import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'pages' })
export class Page extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'title',
    })
    title: string;

    @Column({
        name: 'slug',
        nullable: true
    })
    slug: string;

    @Column('text',{
        name: 'content',
        nullable: true
    })
    content: string;

    @Column({
        name: 'status',
        nullable: true,
    })
    status: boolean;

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

    constructor(partial: Partial<Page>) {
        super();
        Object.assign(this, partial);
    }
}
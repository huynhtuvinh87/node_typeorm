import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'pages' })
export class Page extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        name: 'status',
        default: false
    })
    status: boolean;

    @Column({
        name: 'title',
    })
    title: string;

    @Column({
        name: 'slug',
        nullable: false
    })
    slug: string;

    @Column('text',{
        name: 'description',
        nullable: false
    })
    description: string;

    @Column('text',{
        name: 'content',
        nullable: false
    })
    content: string;

    @Column('timestamp',{
        name: 'created_at',
        nullable: false
    })
    createdAt: string;

    @Column('timestamp',{
        name: 'updated_at',
        nullable: false
    })
    updatedAt: string;

    constructor(partial: Partial<Page>) {
        super();
        Object.assign(this, partial);
    }
}
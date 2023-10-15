import { BaseEntity, Column, ManyToOne, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IsBoolean, IsNotEmpty } from "class-validator"
import { Category } from "./Category";
@Entity({ name: 'articles' })
export class Article extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne((type) => Category, (category) => category.id)
    category: Category[]

    @Column({
        name: 'title',
        nullable: false,
    })
    @IsNotEmpty()
    title: string;

    @Column({
        name: 'slug',
        nullable: true
    })
    slug: string;

    @Column('text', {
        name: 'description',
        nullable: true
    })
    description: string;

    @Column('text', {
        name: 'content',
        nullable: true
    })
    content: string;

    @Column( {
        nullable: true
    })
    photo: string;

    @Column({
        name: 'status',
        nullable: true,
      })
    @IsBoolean()
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
}

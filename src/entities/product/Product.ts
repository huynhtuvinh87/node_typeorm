import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'products' })
export class Product extends BaseEntity {

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
        nullable: true
    })
    slug: string;

    @Column('text',{
        name: 'description',
        nullable: true
    })
    description: string;

    @Column('text',{
        name: 'content',
        nullable: true
    })
    content: string;

    @Column({
        name: 'amount',
        nullable: true,
        type: 'int'
    })
    amount: string;

    @Column({
        name: 'amount_sale',
        nullable: true,
        type: 'int'
    })
    amount_sale: string;

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

    constructor(partial: Partial<Product>) {
        super();
        Object.assign(this, partial);
    }
}
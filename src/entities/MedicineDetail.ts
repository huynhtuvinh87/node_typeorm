import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TYPE_MEDICINE } from "./MedicineType";

@Entity({ name: 'medicine_detail' })
export class MedicineDetail extends BaseEntity {

    @PrimaryGeneratedColumn()
    uuid: number

    @Column({
        name: 'id_type',
        nullable: true
    })
    idType: TYPE_MEDICINE;

    @Column({
        length: 150
    })
    title: string;

    @Column({
        name: 'description_short'
    })
    descriptionShort: string;

    @Column({
        name: 'description'
    })
    description: string;

    @Column({
        name: 'view_editor'
    })
    viewEditor: string;

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
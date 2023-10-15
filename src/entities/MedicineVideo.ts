import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TYPE_MEDICINE } from "./MedicineType";

@Entity({ name: 'medicine_video' })
export class MedicineVideo extends BaseEntity {

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
    type: string;

    @Column({
        length: 150
    })
    title: string;

    @Column({
        length: 150
    })
    description: string;

    @Column({
        name: 'video_path'
    })
    videoPath: string;

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
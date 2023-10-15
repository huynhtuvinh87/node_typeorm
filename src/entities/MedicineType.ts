import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export const enum TYPE_MEDICINE {
    MEDICINE_MEDICINAL = 0, // Thuốc Nam 
    MEDICINE_TRADICTIONAL = 1, // thuốc tây 
    MEDICINE_FOLK = 2, // thuốc dân gian 
    MEDICINE_CHE_TRADICTIONAL = 3, // thuốc bắc 
    MEDICINE_DRUGS_TRADICTIONAL = 4,  // thuốc y học cổ truyền 
    MEDICINE_HEALING_TIPS = 5, // Thuốc Mẹo chữa bệnh 
    MEDICINE_ALL = 6 // Thuốc tổng hợp 
}

@Entity({ name: 'medicine_type' })
export class MedicineType extends BaseEntity {

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
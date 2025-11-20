import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("clinic_staff")
export class Staff{
    @PrimaryGeneratedColumn()
    staff_id!: number;

    @Column({length:150})
    name!: string;

    @Column({ length: 150, unique: true })
    email!: string;

    @Column({length: 150})
    role!: string;

    @Column({ type: "text" })
    password_hash!: string;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
}
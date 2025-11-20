import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity("services")
export class ServiceEntiry{

    @PrimaryGeneratedColumn()
    service_id!: number;

    @Column({length:100})
    name!: string

    @Column({ type: "text", nullable: true })
    description!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
    price!: string;

    @Column({ type: "int", default: 30 })
    duration_minutes!: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    appointments!: Appointment
}
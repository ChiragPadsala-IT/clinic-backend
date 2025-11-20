import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./Patient";
import { Therapist } from "./Therapist";
import { ServiceEntiry } from "./ServiceEntity";

@Entity("appointments")
export class Appointment{

    @PrimaryGeneratedColumn()
    appointment_id!: number;

    @ManyToOne(() => Patient, (patient) => patient.appointments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "patient_id" })
    patient!: number;

    @ManyToOne(() => Therapist, (therapist) => therapist.appointments, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "therapist_id" })
    therapist!: number;

    @ManyToOne(() => ServiceEntiry, (serviceEntiry) => serviceEntiry.appointments, { onDelete: "SET NULL", nullable: true })
    @JoinColumn({ name: "service_id" })
    service!: number;

    @Column({ type: "date" })
    date!: string;

    @Column({ type: "time" })
    start_time!: string;

    @Column({ type: "time" })
    end_time!: string;

    @Column({ length: 50, default: "booked" })
    status!: string;

    @Column({ type: "text", nullable: true })
    notes!: string;

    @CreateDateColumn({type:"timestamp"})
    created_at!: Date;
}
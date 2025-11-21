import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Appointment } from "./Appointment";

@Entity("payment")
export class Payment{

    @PrimaryGeneratedColumn()
    payment_id!: number;

    @ManyToOne(() => Appointment, { onDelete: "CASCADE" })
    @JoinColumn({ name: "appointment_id" })
    appointment!: Appointment;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    amount!: string;

    @Column({ length: 50 })
    payment_method!: string;

    @Column({ length: 50, default: "pending" })
    payment_status!: string;

    @Column({ type: "json", nullable: true })
    payment_meta?: any; // Store provider response (e.g., PayPal order id)

    @CreateDateColumn({ type: "timestamp" })
    created_at!: Date;
}
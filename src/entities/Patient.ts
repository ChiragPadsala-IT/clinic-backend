import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";

@Entity("patients")
export class Patient{

    @PrimaryGeneratedColumn()
    patient_id!: number;

    @Column({length : 100})
    first_name!: string;

    @Column({length : 100})
    last_name!: string;

    @Column({length : 150, unique:true, nullable:true})
    email!: string;

    @Column({length : 20, nullable:true})
    phone!: string;

    @Column({type: "date", nullable: true})
    date_of_birth!: string;

    @Column({length: 20, nullable:true})
    gender!: string;

    @Column({type:"text", nullable:true})
    address!: string;

    @Column({type:"timestamp"})
    created_at!: Date;

    @OneToMany(() => Appointment, (appointment) => appointment.patient)
    appointments! : Appointment[];
}
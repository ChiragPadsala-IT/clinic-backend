import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Appointment from './Appointment';

@Entity("therapist")
export class Therapist {

    @PrimaryGeneratedColumn()
    therapist_id!: number;

    @Column({ length: 100 })
    name!: string;

    @Column({ length: 150, nullable: true })
    specialization?: string;

    @Column({length:50, nullable:true})
    email?: string;

    @Column({ length: 20, nullable: true })
    phone?: string;

    @Column({ type: "int", default: 0 })
    experience_year!: number;

    @Column({ type: "timestamp" })
    created_at!: Date;

    @OneToMany(() => { Appointment }, (appointment) => appointment.therapist);
    appointment!: Appointment[];
}

import { AppDataSource } from "../config/database"
import { Appointment } from "../entities/Appointment";
import { Patient } from "../entities/Patient"
import { ServiceEntiry } from "../entities/ServiceEntity";
import { Therapist } from "../entities/Therapist";

const patientRepo = AppDataSource.getRepository(Patient);
const serviceRepo = AppDataSource.getRepository(ServiceEntiry);
const therapistRepo = AppDataSource.getRepository(Therapist);
const appointmentRepo = AppDataSource.getRepository(Appointment);

export class AppointmentService {
    static async create(payload: any) {
        const patient = await patientRepo.findOne({ where: { patient_id: Number(payload.patient_id) } });

        if (!patient) throw new Error("Patient not found");

        const service = await serviceRepo.findOne({ where: { service_id: Number(payload.service_id) } });

        if (!service) throw new Error("Service not found");

        let therapist: Therapist | undefined;

        if (payload.therapist_id) {
            // therapist = await therapistRepo.findOne({ where: { therapist_id: Number(payload.therapist_id) } });
            therapist = await therapistRepo.findOne({ where: { therapist_id: Number(payload.therapist_id) } }) || undefined;
        }

        const appt = appointmentRepo.create({
            patient,
            service,
            therapist,
            date: payload.date,
            start_time: payload.start_time,
            end_time: payload.end_time,
            status: payload.status || "booked",
            notes: payload.notes
        });

        return appointmentRepo.save(appt);
    }

    static getById(id: number) {
        return appointmentRepo.findOne({where:{appointment_id:id}, relations: ["patient","therapist","service"]})
    }

    static list() {
        return appointmentRepo.find({relations:["patient","therapist","service"], order:{date:"DESC"}});
    }
}
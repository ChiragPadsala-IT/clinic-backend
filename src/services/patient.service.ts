import { AppDataSource } from "../config/database";
import { Patient } from "../entities/Patient";

const patientRepo = AppDataSource.getRepository(Patient);

export class PatientService{
    static async createPatient(payload: Partial<Patient>) {
        const p = patientRepo.create(payload);
        return patientRepo.save(p);
    }

    static async getPatientById(id: number) {
        return patientRepo.findOne({where:{patient_id: id}, relations: ["appointments"]})
    }

    static async listPatients() {
        return patientRepo.find({relations:["appointments"],order:{created_at:"DESC"}})
    }
}
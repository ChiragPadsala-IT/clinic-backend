import { AppDataSource } from "../config/database";
import { Patient } from "../entities/Patient";

const patientRepo = AppDataSource.getRepository(Patient);

export class PatientService{
    static async createPatient(payload: Partial<Patient>) {
        const p = patientRepo.create(payload);
        return await patientRepo.save(p);
    }

    static async getPatientById(id: number) {
        return await patientRepo.findOne({where:{patient_id: id}, relations: ["appointments"]})
    }

    static async listPatients() {
        return await patientRepo.find({relations:["appointments"],order:{created_at:"DESC"}})
    }
}
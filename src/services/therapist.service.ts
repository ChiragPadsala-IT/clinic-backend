import { AppDataSource } from "../config/database";
import { Therapist } from "../entities/Therapist";

const therapistRepo = AppDataSource.getRepository(Therapist);

export class TherapistService{

    static create(payload: Partial<Therapist>) {
        const t = therapistRepo.create(payload);
        return therapistRepo.save(t);
    }

    static getAll() {
        return therapistRepo.find();
    }

    static getById(id: number) {
        return therapistRepo.findOne({ where: { therapist_id: id } });
    }

    static update(id: number, payload: Partial<Therapist>) {
        return therapistRepo.update(id, payload);
    }

    static delete(id: number) {
        return therapistRepo.delete(id);
    }
}
import { AppDataSource } from "../config/database";
import { ServiceEntiry } from "../entities/ServiceEntity";

const serviceRepo = AppDataSource.getMongoRepository(ServiceEntiry);

export class Service{
    static create(payload: Partial<ServiceEntiry>) {
        const s = serviceRepo.create(payload);
        return serviceRepo.save(s);
    }

    static list() {
        return serviceRepo.find({ order: { created_at: "DESC" } });
    }

    static getById(id: number) {
        return serviceRepo.findOne({where:{service_id:id}})
    }
}
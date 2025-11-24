import { NextFunction, Request, Response } from "express";
import { TherapistService } from "../services/therapist.service";

export const createTherapist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role === "admin") {
            const payload = req.body;
            const therapist = await TherapistService.create(payload);
            res.status(201).json({ therapist });
        } else {
            throw new Error("Anauthorize request");
        }
    } catch (error) {
        next(error);
    }
}

export const listAllTherapist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role === "admin") {
            const therapist = await TherapistService.getAll();
            res.status(201).json({ therapist });
        } else {
            throw new Error("Anauthorize request");
        }
    } catch (error) {
        next(error);
    }
}

export const getTherapistId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role === "admin") {
            const { id } = req.params;
            const therapist = await TherapistService.getById(Number(id));
            res.status(201).json({ therapist });
        } else {
            throw new Error("Anauthorize request");
        }
    } catch (error) {
        next(error);
    }
}
export const updateTherapist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role === "admin") {
            const { id } = req.params;
            const payload = req.body;
            const therapist = await TherapistService.update(Number(id),payload);
            res.status(201).json({ therapist });
        } else {
            throw new Error("Anauthorize request");
        }
    } catch (error) {
        next(error);
    }
}
export const deleteTherapist = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.user?.role === "admin") {
            const { id } = req.params;
            const therapist = await TherapistService.delete(Number(id));
            res.status(201).json({ therapist });
        } else {
            throw new Error("Anauthorize request");
        }
    } catch (error) {
        next(error);
    }
}
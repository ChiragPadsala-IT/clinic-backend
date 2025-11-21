import { NextFunction, Request, Response } from "express";
import { AppointmentService } from "../services/appointment.service";

export const createAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;

        const appointment = await AppointmentService.create(payload);

        res.status(201).json({ appointment });
    } catch (error) {
        next(error);
    }
}

export const getAppointment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);

        const appointment = await AppointmentService.getById(id);

        if (!appointment) return res.status(404).json({ message: "Not found" });

        res.json({ appointment });
    } catch (error) {
        next(error);
    }
}

export const listAppointment = async (req: Request, res: Response, next: NextFunction) => { 
    try {
        const list = await AppointmentService.list();
        res.json({ data: list });
    } catch (error) {
        next(error);
    }
}
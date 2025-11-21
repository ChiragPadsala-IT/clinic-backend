import { NextFunction, Request, Response } from "express";
import { PatientService } from "../services/patient.service";

export const createPatient =  async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const patient = await PatientService.createPatient(body);
        res.status(200).json({ patient });
    } catch (error) {
        next(error);
    }
}

export const getPatient = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = Number(req.params.id);
        const patient = await PatientService.getPatientById(id);
        
        if (!patient) return res.status(404).json({ message: "Not found" });

        res.json({ patient });

    } catch (error) {
        next(error);
    }
}

export const listPatients = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const list = await PatientService.listPatients();
        res.json({data: list})
    } catch (error) {
        next(error);
    }
}
import { NextFunction, Request, Response } from "express";
import { ServiceService } from "../services/service.service";

export const createService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const service = await ServiceService.create(payload);
        res.status(200).json({ service });
    } catch (error) {
        next(error);
    }
}

export const listService = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await ServiceService.list();
        res.json({ data });
    } catch (error) {
        next(error);
    }
}

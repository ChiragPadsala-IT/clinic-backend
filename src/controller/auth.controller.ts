import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password, role } = req.body;

        const staff = await AuthService.registerStaff(name, email, password, role);

        res.status(200).json({ staff });
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        const data = await AuthService.login(email, password);

        res.json(data);
    } catch (error) {
        next(error);
    }
}
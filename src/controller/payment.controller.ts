import { NextFunction, Request, Response } from "express";
import { PaymentService } from "../services/payment.service";

export const createOrder = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const { appointment_id, amount } = req.body;

        const result = await PaymentService.createPaypalOrder(Number(appointment_id), String(amount));

        res.json(result);
    } catch (error) {
        next(error);
    }
}

export const captureOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { orderId, appointment_id, amount } = req.body;

        const result = await PaymentService.captureOrder(orderId);

        await PaymentService.recordPayment(Number(appointment_id), String(amount), "paypal", result);

        res.json(result);
    } catch (error) {
        next(error);
    }
}
import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export interface AuthRequest extends Request{
    user?: any;
}

export function authenticateJWT(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ message: "Missing authorization header" })
    
    const token = authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Invalid authorization format" })
    
    try {
        const secret = process.env.JWT_SECRET!;
        const payload = jwt.verify(token, secret);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
 }
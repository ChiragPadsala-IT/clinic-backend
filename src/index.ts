import "reflect-metadata";
import express, {Request,Response } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import { AppDataSource } from "./config/database";
import path from 'path';
import authRoutes from './routes/auth.routes';
import appointmentRoutes from './routes/appointment.routes';
import patientRoutes from './routes/patient.routes';
import paymentRoutes from './routes/payment.routes';
import serviceRoutes from './routes/service.routes';
import therapistRoutes from './routes/therapist.routes';
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();

const PORT = process.env.PORT || 4000;

async function start() {
    try {
        await AppDataSource.initialize();
        console.log("Database connected");

        const app = express();

        app.use(cors());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        
        // static upload
        app.use("/uploads", express.static(path.join(__dirname, "..", process.env.UPLOAD_DIR || "uploads")));

        //routes
        app.use("/api/auth", authRoutes);
        app.use("/api/patients", patientRoutes);
        app.use("/api/therapists", therapistRoutes);
        app.use("/api/services", serviceRoutes);
        app.use("/api/appointments", appointmentRoutes);
        app.use("/api/payments", paymentRoutes);

        app.get("/", (_req: Request, res: Response) => {
            res.json({ok: true, message: "Physio Clinic API"});
        })

        //error Handler
        app.use(errorHandler);

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`)
        })
    } catch (error) {
        console.log("Failed to start app: ", error)
        process.exit(1);
    }
}

start();
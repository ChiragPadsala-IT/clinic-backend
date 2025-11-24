import dotenv from 'dotenv';
import { AppDataSource } from '../config/database';
import { Staff } from '../entities/Staff';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

dotenv.config();

const staffRepo = AppDataSource.getRepository(Staff);

export class AuthService {
    static async registerStaff(name: string, email: string, password: string, role: string) {
        const existing = await staffRepo.findOne({ where: { email } });

        if (existing) throw new Error("Email already used.");

        const hash = await bcrypt.hash(password, 10);
        const staff = staffRepo.create({ name, email, password_hash: hash, role });

        return staffRepo.save(staff);
    }

    static async login(email: string, password: string) {
        const staff = await staffRepo.findOne({ where: { email } });

        if (!staff) throw new Error("Invalid credentials");

        const ok = await bcrypt.compare(password, staff.password_hash);

        if (!ok) throw new Error("Invalid credentials");

        const token = jwt.sign({ staffId: staff.staff_id, email: staff.email, role: staff.role },
            process.env.JWT_SECRET!,
            {
                // expiresIn: process.env.JWT_EXPIRES_IN || "7d", \\ getting error
                expiresIn: "7d",
            });

        return { token, staff };
    }
}
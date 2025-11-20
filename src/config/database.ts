import "reflect-metadata";
import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL,
    synchronize: true, // set false for production and use migrations
    logging: false,
    entities: [__dirname + "/../entities/*.{ts,js}"],
    migrations:[__dirname + "/../migrations/*.{ts,js}"],
});
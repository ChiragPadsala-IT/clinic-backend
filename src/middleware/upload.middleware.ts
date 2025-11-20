import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

dotenv.config();

const UPLOAD_DIR = process.env.UPLOAD_DIR || "uploads";
const uploadPath = path.join(process.cwd(), UPLOAD_DIR);

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true })
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadPath)
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        const base = path.basename(file.originalname, ext).replace(/\s+/g, "-");
        cb(null, `${Date.now()}-${base}${ext}`)
    }
})

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 *1024}
})
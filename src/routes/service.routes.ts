import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { createService, listServices } from "../controller/service.controller";
import { upload } from "../middleware/upload.middleware";
import { ServiceService } from "../services/service.service";

const router = Router();

router.post("/", authenticateJWT, createService);
router.get("/", listServices);

router.post("/", authenticateJWT, upload.single("image"), async (req, res, next) => {
    try {
        
        const payload = req.body;
        if (req.file) {
            payload.image_url = `/uploads/${req.file.filename}`;
        }

        const service = await ServiceService.create(payload);
        res.status(201).json({service});
    } catch (err) {
        next(err)
    }
 })

export default router;

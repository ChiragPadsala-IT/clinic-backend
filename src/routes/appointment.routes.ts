import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { createAppointment, getAppointment, listAppointments } from "../controller/appointment.controller";

const router = Router();

router.post("/", authenticateJWT, createAppointment);
router.get("/", authenticateJWT, listAppointments);
router.get("/:id", authenticateJWT, getAppointment);

export default router;

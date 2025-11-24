import { Router } from "express";
import { authenticateJWT } from "../middleware/auth.middleware";
import { createPatient, getPatient, listPatients } from "../controller/patient.controller";

const router = Router();

router.post("/", authenticateJWT, createPatient);
router.get("/", authenticateJWT, listPatients);
router.get("/:id", authenticateJWT, getPatient);

export default router;

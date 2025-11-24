import { Router } from 'express';
import { createTherapist, deleteTherapist, getAllTherapist, getTherapistById, updateTherapist } from '../controller/therapist.controller';
import { authenticateJWT } from '../middleware/auth.middleware';

const router = Router();

router.post("/",authenticateJWT,createTherapist);
router.get("/",authenticateJWT,getAllTherapist);
router.get("/:id",authenticateJWT,getTherapistById);
router.put("/:id",authenticateJWT,updateTherapist);
router.delete("/:id",authenticateJWT,deleteTherapist);

export default router;
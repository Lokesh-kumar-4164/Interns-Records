import { LoginValidationController } from "../controllers/adminController";
import { Router } from "express";

const router = Router();

router.post("/login", LoginValidationController);

export default router;
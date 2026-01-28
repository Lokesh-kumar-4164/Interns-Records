import { verify } from "crypto";
import { 
    passwordReset,
    LoginValidationController,
    createUser,
    verifyOTP,
    updatePassword,
    checkRole
} from "../controllers/adminController";
import { Router } from "express";

const router = Router();

router.post("/login", LoginValidationController);
router.post("/createuser", createUser);
router.post('/reset-password',passwordReset)
router.post("/verify-otp",verifyOTP)
router.post("/update-password",updatePassword);
router.get("/check-role", checkRole);

export default router;
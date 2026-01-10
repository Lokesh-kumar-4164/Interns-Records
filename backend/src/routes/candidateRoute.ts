import express from "express";
import {
  addCandidateController,
  deleteCandidateController,
  getCandidateController,
  updateCandidateController,
  checkJoiningReminderController,
  uploadExcelController,
} from "../controllers/candidateController";
import { uploadExcel } from "../middlewares/uploadExcel";

const router = express.Router();

router.post("/add", addCandidateController);
router.get("/", getCandidateController);
router.delete("/:id", deleteCandidateController);
router.put("/:id", updateCandidateController);
router.get("/check-joining-reminders", checkJoiningReminderController);

router.post("/upload-excel", uploadExcel.single("file"), uploadExcelController);

export default router;

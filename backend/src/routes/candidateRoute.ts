import express from "express";
import {
  addCandidateController,
  deleteCandidateController,
  getCandidateController,
  updateCandidateController,
  checkJoiningReminderController,
} from "../controllers/candidateController";

const router = express.Router();

router.post("/add", addCandidateController);
router.get("/", getCandidateController);
router.delete("/:id", deleteCandidateController);
router.put("/:id", updateCandidateController);
router.get("/check-joining-reminders", checkJoiningReminderController);

export default router;

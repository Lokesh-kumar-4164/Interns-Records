import express from "express";
import { addCandidateController, deleteCandidateController, getCandidateController, updateCandidateController } from "../controllers/candidateController";

const router = express.Router();

router.post("/add", addCandidateController);
router.get("/", getCandidateController)
router.delete("/:id", deleteCandidateController)
router.put("/:id", updateCandidateController)

export default router;

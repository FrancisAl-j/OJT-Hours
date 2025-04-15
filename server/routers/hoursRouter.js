import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createHours, updateHours } from "../controllers/hoursController.js";

const router = express.Router();

router.post("/create", verifyToken, createHours);
router.put("/update", verifyToken, updateHours);

export default router;

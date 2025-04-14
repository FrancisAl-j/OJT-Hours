import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createHours } from "../controllers/hoursController.js";

const router = express.Router();

router.post("/create", verifyToken, createHours);

export default router;

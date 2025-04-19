import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createHours,
  getHistory,
  getHours,
  updateHours,
} from "../controllers/hoursController.js";

const router = express.Router();

/**
 * PUT
 */
router.put("/update/:id", verifyToken, updateHours);

/**
 * POST
 */
router.post("/create", verifyToken, createHours);

/**
 * GET
 */
router.get("/get", verifyToken, getHours);
router.get("/get/history", verifyToken, getHistory);

export default router;

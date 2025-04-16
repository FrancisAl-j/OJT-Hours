import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  createHours,
  getHours,
  updateHours,
} from "../controllers/hoursController.js";

const router = express.Router();

/**
 * POST
 */
router.post("/create", verifyToken, createHours);

/**
 * PUT
 */
router.put("/update", verifyToken, updateHours);

/**
 * GET
 */
router.get("/get", verifyToken, getHours);

export default router;

import express from "express";
import {
  logout,
  signin,
  signup,
  checkAuth,
} from "../controllers/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

/**
 *
 * POST API
 *
 */
router.post("/signup", signup); // TODO: Signup API
router.post("/signin", signin); // TODO: Signin API
router.post("/logout", logout); // TODO: Logout API

/**
 *
 * GET API
 *
 */
router.get("/check", verifyToken, checkAuth); // TODO: Checking authentication to keep the user logged in

export default router;

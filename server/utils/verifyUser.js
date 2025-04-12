import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyToken = async (req, res, next) => {
  // Getting the token
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "User is not authenticated." });
  }

  try {
    // Decoding the token
    const token_decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = token_decode;

    next();
  } catch (error) {
    res.status(401).json({ message: "User is not authenticated." });
  }
};

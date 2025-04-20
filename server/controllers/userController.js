import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import redisClient from "../utils/redis.js";

/**
 * User Sign up API
 */
export const signup = async (req, res) => {
  const { email, username, password } = req.body;
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/; // Regex to check if the email is valid.

  if (!gmailRegex.test(email)) {
    return res.status(401).json({ message: "Email is not valid." });
  }

  if (!username) {
    return res.status(401).json({ message: "Username is required." });
  }
  try {
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(401).json({ message: "Email already existed." });
    }

    if (password.trim().length < 8) {
      return res
        .status(400)
        .json({ message: "Password must have more than 8 characters" });
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Successfully created an account." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * User signin API
 */
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Checks if there is a user email
    const user = await User.findOne({ email });
    // Checks if the email is falsy then it will return an error if wrong email
    if (!user) {
      return res.status(401).json({
        message: "Invalid Credentials, Please check your password or email.",
      });
    }

    // Checks if the password in the request body is the same on user password
    const checkPassword = await bcrypt.compareSync(password, user.password);
    // Checks if password is falsy then it will return an error
    if (!checkPassword) {
      return res.status(401).json({
        message: "Invalid Credentials, Please check your password or email.",
      });
    }
    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    generateToken(payload, res);

    // Remove the password when fetching
    const { password: hashedPassword, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * User logout API
 */

export const logout = async (req, res) => {
  try {
    const cachedKey = "history";
    res.cookie("token", "", { maxAge: 0 });
    await redisClient.del(cachedKey);

    res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Check Authentication API
 */
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User is not authenticated." });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Update User Profile API
 */
export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, password } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Collects the data need
    const updatedData = {
      username,
    };

    // If the user wants to change the password it will be added to updateData object
    if (password) {
      updatedData.password = bcrypt.hashSync(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    const { password: _, ...rest } = updatedUser._doc;

    res.status(200).json(rest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

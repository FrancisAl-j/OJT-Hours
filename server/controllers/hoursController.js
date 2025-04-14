import Hours from "../models/hoursModel.js";
import User from "../models/userModel.js";

export const createHours = async (req, res) => {
  const { time, hoursTarget } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }
    const newHours = new Hours({
      time,
      hoursTarget,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

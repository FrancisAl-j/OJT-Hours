import Hours from "../models/hoursModel.js";
import User from "../models/userModel.js";

// Creating Hours
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

    await newHours.save();

    res.status(201).json(newHours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Updating Hours
export const updateHours = async (req, res) => {
  const { id } = req.params;
  const { time } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const hours = await Hours.findByIdAndUpdate(id, { time }, { new: true });

    res.status(200).json(hours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

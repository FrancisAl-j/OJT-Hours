import Hours from "../models/hoursModel.js";
import User from "../models/userModel.js";
import History from "../models/historyModel.js";

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
  const { time, minutes, seconds } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const history = new History({
      hours: time,
      minutes,
      seconds,
      userId: user._id,
    });

    await history.save();

    const hours = await Hours.findByIdAndUpdate(
      id,
      { $inc: { time } },
      { new: true }
    );

    res.status(200).json(hours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Getting the hours data based on user's id

export const getHours = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ message: "User not authenticated." });
    }

    const hours = await Hours.findOne({ userId: user._id });

    res.status(200).json(hours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Getting Histories of Hours
export const getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await History.find({ userId });

    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

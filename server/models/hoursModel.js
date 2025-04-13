import mongoose from "mongoose";

const hoursSchema = new mongoose.Schema(
  {
    time: {
      type: Number,
    },
    hoursTarget: {
      type: Number,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

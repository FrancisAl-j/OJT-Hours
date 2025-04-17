import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    hours: {
      type: Number,
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

const History = mongoose.model("history", historySchema);

export default History;

import mongoose from "mongoose";

const wingoGameSchema = new mongoose.Schema(
  {
    gameType: {
      type: String,
      enum: ["30sec", "1min", "3min", "5min"],
      required: true,
    },
    period: {
      type: String,
      required: true,
      unique: true,
    },
    result: {
      number: {
        type: Number,
        min: 0,
        max: 9,
      },
      color: {
        type: String,
        enum: ["red", "green", "violet"],
      },
      size: {
        type: String,
        enum: ["big", "small"],
      },
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const WingoGame = mongoose.model("WingoGame", wingoGameSchema);

export default WingoGame;

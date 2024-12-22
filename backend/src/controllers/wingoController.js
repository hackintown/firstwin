import WingoGame from "../models/WingoGame.js";
import { generateWingoResult } from "../utils/wingoUtils.js";

// Get current and upcoming games
export const getWingoGames = async (req, res) => {
  try {
    const { gameType } = req.query;
    const currentTime = new Date();

    const games = await WingoGame.find({
      gameType,
      endTime: { $gte: currentTime },
    })
      .sort({ startTime: 1 })
      .limit(10);

    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new game periods
export const createWingoGames = async (req, res) => {
  try {
    const { gameType } = req.body;
    const currentTime = new Date();
    let interval;

    switch (gameType) {
      case "30sec":
        interval = 30000;
        break;
      case "1min":
        interval = 60000;
        break;
      case "3min":
        interval = 180000;
        break;
      case "5min":
        interval = 300000;
        break;
      default:
        throw new Error("Invalid game type");
    }

    // Create next 10 periods
    const games = [];
    for (let i = 0; i < 10; i++) {
      const startTime = new Date(currentTime.getTime() + interval * i);
      const endTime = new Date(startTime.getTime() + interval);
      const period = `${gameType}-${startTime.getTime()}`;

      games.push({
        gameType,
        period,
        startTime,
        endTime,
        status: "pending",
      });
    }

    await WingoGame.insertMany(games);

    res.status(201).json({ message: "Games created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

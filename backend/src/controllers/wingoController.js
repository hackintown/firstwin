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

// Updated createWingoGames function
export const createWingoGames = async (req, res) => {
  try {
    const { gameType } = req.body;
    const currentTime = new Date();

    // Validate game type
    const slots = {
      "30sec": 30000,
      "1min": 60000,
      "3min": 180000,
      "5min": 300000,
    };

    const interval = slots[gameType];
    if (!interval) {
      throw new Error("Invalid game type");
    }

    // Create next 10 periods
    const games = [];
    for (let i = 0; i < 10; i++) {
      const startTime = new Date(currentTime.getTime() + interval * i);
      const endTime = new Date(startTime.getTime() + interval);
      // const period = `${gameType}-${startTime.getTime()}`;
      const period = startTime.toISOString()
        .replace(/[-:T.Z]/g, '')
        .slice(0, 17);

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

// New function for game loop +  WebSocket handling for real-time updates
export const startGameLoop = (io) => {
  const slots = [
    { gameType: "30sec", interval: 30000 },
    { gameType: "1min", interval: 60000 },
    { gameType: "3min", interval: 180000 },
    { gameType: "5min", interval: 300000 },
  ];

  slots.forEach(({ gameType, interval }) => {
    setInterval(async () => {
      const currentTime = new Date();

      // Generate period
      // const period = `${gameType}-${currentTime.getTime()}`;
      const period = currentTime.toISOString()
        .replace(/[-:T.Z]/g, '')
        .slice(0, 17);
      const { number, color, size } = generateWingoResult();

      const newGame = new WingoGame({
        gameType,
        period,
        startTime: currentTime,
        endTime: new Date(currentTime.getTime() + interval),
        result: { number, color, size },
        status: "completed",
      });

      await newGame.save();

      // Emit the result
      io.emit(`game:${gameType}`, {
        type: "newGame",
        data: newGame,
      });

      // Start countdown
      const countdownInterval = setInterval(() => {
        const timeRemaining = Math.max(0, Math.floor((newGame.endTime - Date.now()) / 1000));
        io.emit(`game:${gameType}`, { type: "countdown", data: { timeRemaining } });

        if (timeRemaining <= 0) {
          clearInterval(countdownInterval);
        }
      }, 1000);
    }, interval);
  });
};
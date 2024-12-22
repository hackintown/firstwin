import cron from "node-cron";
import WingoGame from "../models/WingoGame.js";
import { generateWingoResult } from "./wingoUtils.js";

export const startWingoCron = () => {
  // Run every second to check for games that need results
  cron.schedule("* * * * * *", async () => {
    try {
      const currentTime = new Date();

      // Find games that have ended but don't have results
      const completedGames = await WingoGame.find({
        status: "pending",
        endTime: { $lte: currentTime },
      });

      // Generate and save results
      for (const game of completedGames) {
        game.result = generateWingoResult();
        game.status = "completed";
        await game.save();
      }
    } catch (error) {
      console.error("Wingo cron error:", error);
    }
  });
};

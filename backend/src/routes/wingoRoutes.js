import express from "express";
import {
  getWingoGames,
  createWingoGames,
} from "../controllers/wingoController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/games", protect, getWingoGames);
router.post("/create-games", protect, createWingoGames);

export default router;

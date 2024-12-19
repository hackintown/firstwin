import express from "express";
import {
  adminDashboard,
  userDashboard,
} from "../controllers/dashboardController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authorize } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// Dashboard routes
router.get("/admin", protect, authorize(["admin"]), adminDashboard);
router.get("/user", protect, authorize(["user", "admin"]), userDashboard);

export default router;

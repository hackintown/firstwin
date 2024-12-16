import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import {
  validateRegistration,
  validateLogin,
} from "../validators/authValidators.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = express.Router();

router.post("/register", validateRegistration, validateRequest, registerUser);
router.post("/login", validateLogin, validateRequest, loginUser);

export default router;

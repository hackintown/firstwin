import { body } from "express-validator";

export const validateRegistration = [
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("countryCode").notEmpty().withMessage("Country code is required"),
  body("agreeToTerms").isBoolean().withMessage("Agreeing to terms is required"),
];

export const validateLogin = [
  body("phone").optional().isMobilePhone().withMessage("Invalid phone number"),
  body("email").optional().isEmail().withMessage("Invalid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

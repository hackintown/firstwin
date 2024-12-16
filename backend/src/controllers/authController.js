import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Register User
export const registerUser = async (req, res, next) => {
  try {
    const { phone, email, password, countryCode, agreeToTerms } = req.body;

    // Check if user exists
    if (phone && (await User.findOne({ phone }))) {
      return res.status(400).json({ message: "Phone already registered" });
    }
    if (email && (await User.findOne({ email }))) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create user
    const user = await User.create({
      phone,
      email,
      password,
      countryCode,
      agreeToTerms,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        phone: user.phone,
        email: user.email,
        countryCode: user.countryCode,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    next(error);
  }
};

// Login User
export const loginUser = async (req, res, next) => {
  try {
    const { phone, email, password } = req.body;

    const user = phone
      ? await User.findOne({ phone })
      : await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        phone: user.phone,
        email: user.email,
        countryCode: user.countryCode,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    next(error);
  }
};

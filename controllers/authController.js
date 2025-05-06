import User from "../models/User.js";
import Donor from '../models/Donor.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

// JWT Token Generator
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @route   POST /api/auth/register
export const registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      token: generateToken(newUser._id),
    });
  } catch (error) {
    console.log("❌ Registration Error:", error);
    res.status(500).json({ message: "Registration failed", error });
  }
};

// @route   POST /api/donors/login
export const loginDonor = async (req, res) => {
  const { email, password } = req.body;

  try {
    const donor = await Donor.findOne({ email });

    if (!donor) {
      return res.status(400).json({ message: 'Donor not found' });
    }

    if (!donor.password) {
      return res.status(400).json({ message: 'This donor has no password set' });
    }

    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    //Return both token and donor info
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: donor._id,
        name: donor.name,
        email: donor.email,
        role: 'donor' 
      }
    });
  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @route   POST /api/auth/login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("🔐 Login attempt:", email, password);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ User not found");
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log("❌ Invalid password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("✅ Login successful");
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Login failed", error });
  }
};
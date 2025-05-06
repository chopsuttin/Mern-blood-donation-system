import express from 'express';
import { registerHospital, loginHospital } from '../controllers/hospitalController.js';
import bcrypt from 'bcryptjs';
import Hospital from "../models/Hospital.js";

const router = express.Router();

// Route: POST /api/hospitals/
router.post('/register', registerHospital);
router.post('/login', loginHospital);

// GET /api/hospitals
router.get("/", async (req, res) => {
  try {
    const hospitals = await Hospital.find({}, "name location");
    res.status(200).json(hospitals);
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    res.status(500).json({ message: "Failed to fetch hospitals" });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, password } = req.body;

    // Basic validation 
    if (!name || !email || !phone || !address || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newHospital = new Hospital({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    });

    await newHospital.save();
    res.status(201).json({ message: 'Hospital registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register hospital' });
  }
});

export default router;

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Hospital from '../models/Hospital.js';

// REGISTER
export const registerHospital = async (req, res) => {
  const { name, email, password, location } = req.body;

  try {
    const existing = await Hospital.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Hospital already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const hospital = new Hospital({
      name,
      email,
      password: hashedPassword,
      location,
      role: 'hospital'
    });

    await hospital.save();

    const token = jwt.sign({ id: hospital._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({ message: 'Registered successfully', token });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};

// LOGIN
export const loginHospital = async (req, res) => {
  const { email, password } = req.body;

  try {
    const hospital = await Hospital.findOne({ email });
    if (!hospital) return res.status(404).json({ message: 'Hospital not found' });

    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: hospital._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        name: hospital.name,
        email: hospital.email,
        role: hospital.role
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed' });
  }
};
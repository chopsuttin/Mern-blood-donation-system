import Donor from '../models/Donor.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new donor
export const registerDonor = async (req, res) => {
  const { name, email, password, bloodType, location } = req.body;

  try {
    // Check if donor already exists
    const existingDonor = await Donor.findOne({ email });
    if (existingDonor) {
      return res.status(400).json({ message: 'Donor already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new donor
    const newDonor = new Donor({
      name,
      email,
      password: hashedPassword,
      bloodType,
      location
    });

    await newDonor.save();

    // Create JWT token
    const token = jwt.sign({ id: newDonor._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.status(201).json({
      message: 'Donor registered successfully',
      token,
      user: {
        id: newDonor._id,
        name: newDonor.name,
        email: newDonor.email,
        role: 'donor'
      }
    });
  } catch (error) {
    console.error('Donor registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// Donor login
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

    const token = jwt.sign({ id: donor._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });

    res.json({
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

// Get all donors
export const getDonors = async (req, res) => {
  try {
    const donors = await Donor.find();
    res.status(200).json(donors);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch donors' });
  }
};
// Search donors by blood type and location (for hospitals)
export const searchDonors = async (req, res) => {
  const { bloodType, location } = req.query;

  const query = {
    isAvailable: true,
    ...(bloodType && { bloodType }),
    ...(location && { location: new RegExp(location, 'i') }),
  };

  try {
    const donors = await Donor.find(query).select('-password');
    res.status(200).json(donors);
  } catch (error) {
    console.error('Donor search error:', error);
    res.status(500).json({ message: 'Error searching for donors' });
  }
};

// Get the currently logged-in donor
export const getCurrentDonor = async (req, res) => {
  try {
    const donor = await Donor.findById(req.user.id).select('-password');
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching donor' });
  }
};

// Update donor profile
export const updateDonor = async (req, res) => {
  try {
    const updatedDonor = await Donor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDonor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.status(200).json(updatedDonor);
  } catch (err) {
    console.error('Error updating donor:', err);
    res.status(500).json({ message: 'Failed to update donor' });
  }
};
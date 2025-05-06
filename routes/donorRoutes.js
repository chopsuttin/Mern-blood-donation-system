import express from 'express';
import verifyToken from '../middleware/auth.js';
import { updateDonor } from '../controllers/donorController.js';
import {
  registerDonor,
  getDonors,
  getCurrentDonor
} from '../controllers/donorController.js';
import { loginDonor } from '../controllers/authController.js';
import { searchDonors } from '../controllers/donorController.js';

const router = express.Router();

// Get current logged-in donor
router.get('/me', verifyToken, getCurrentDonor);

// Register a new donor
router.post('/register', registerDonor);

// Get all donors (admin or filtering)
router.get('/', getDonors);

// Login a donor
router.post('/login', loginDonor);

// Update donor information
router.put('/:id', verifyToken, updateDonor);

// Search available donors by blood type & location
router.get('/search', verifyToken, searchDonors);

export default router;
import express from 'express';
import { updateBloodRequestStatus } from '../controllers/bloodRequestController.js';
import verifyToken from '../middleware/auth.js';
import {
  createBloodRequest,
  getAllRequests,
  getHospitalRequests
} from '../controllers/bloodRequestController.js';

const router = express.Router();

 // Update blood request status (e.g., fulfilled or cancelled)
router.put('/:id', verifyToken, updateBloodRequestStatus);

// Create a blood request (Hospital only)
router.post('/', verifyToken, createBloodRequest);

// Get all open requests (for donors)
router.get('/', getAllRequests);

// Get current hospital’s own requests
router.get('/my', verifyToken, getHospitalRequests);

export default router;
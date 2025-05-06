// routes/appointmentRoutes.js
import express from 'express';
import verifyToken from '../middleware/auth.js';
import {
  bookAppointment,
  getAppointmentsByDonor,
  getAppointmentsByHospital,
} from '../controllers/appointmentController.js';

const router = express.Router();

// Book a new appointment
router.post('/', verifyToken, bookAppointment);

// Get all appointments for a logged-in donor
router.get('/donor', verifyToken, getAppointmentsByDonor);

// Get all appointments for a logged-in hospital
router.get('/hospital', verifyToken, getAppointmentsByHospital);

export default router;

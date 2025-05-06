// controllers/appointmentController.js
import Appointment from '../models/Appointment.js';

// Create a new appointment
export const bookAppointment = async (req, res) => {
  const donorId = req.user.id; // ✅ comes from token
  const { hospitalId, date, time } = req.body;

  if (!donorId || !hospitalId || !date || !time) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAppointment = new Appointment({
      donor: donorId,
      hospital: hospitalId,
      date,
      time,
    });

    await newAppointment.save();
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (err) {
    console.error('Appointment booking error:', err);
    res.status(500).json({ message: 'Server error while booking appointment' });
  }
};

// Get all appointments for a donor
export const getAppointmentsByDonor = async (req, res) => {
  try {
    const appointments = await Appointment.find({ donor: req.user.id })
      .populate('hospital', 'name location')
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments' });
  }
};

// Get all appointments for a hospital
export const getAppointmentsByHospital = async (req, res) => {
  try {
    const appointments = await Appointment.find({ hospital: req.user.id })
      .populate('donor', 'name email bloodType')
      .sort({ date: 1 });

    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch appointments' });
    console.log("Received appointment request:", req.body);
console.log("Decoded user from token:", req.user);
  }
};

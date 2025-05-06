// controllers/adminController.js
import Donor from '../models/Donor.js';
import Hospital from '../models/Hospital.js';
import Appointment from '../models/Appointment.js';
import BloodRequest from '../models/BloodRequest.js';

export const getAdminStats = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    const totalDonors = await Donor.countDocuments();
    const totalHospitals = await Hospital.countDocuments();
    const totalAppointments = await Appointment.countDocuments();
    const openRequests = await BloodRequest.countDocuments({ status: 'open' });
    const fulfilledRequests = await BloodRequest.countDocuments({ status: 'fulfilled' });

    res.status(200).json({
      totalDonors,
      totalHospitals,
      totalAppointments,
      openRequests,
      fulfilledRequests,
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    res.status(500).json({ message: 'Server error fetching admin stats' });
  }
};

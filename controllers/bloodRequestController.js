import BloodRequest from '../models/BloodRequest.js';
import Donor from '../models/Donor.js';
import nodemailer from 'nodemailer';

// @desc    Create a new blood request (Hospital only)
export const createBloodRequest = async (req, res) => {
  try {
    const { bloodType, quantity, urgency, notes } = req.body;

    const newRequest = new BloodRequest({
      hospital: req.user.id, // assuming JWT middleware sets req.user
      bloodType,
      quantity,
      urgency,
      notes
    });

    await newRequest.save();

    // Find matching donors
    const matchingDonors = await Donor.find({
      bloodType,
      isAvailable: true
    });

    // Send notification emails (or log them)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    for (const donor of matchingDonors) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: donor.email,
        subject: 'Urgent Blood Donation Request',
        text: `Hello ${donor.name},

A hospital near you is requesting blood of your type (${bloodType}).

Urgency: ${urgency}
Amount Needed: ${quantity} units

If you're available, please log in and respond.

Thank you for being a life-saver!`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(`Failed to send email to ${donor.email}:`, error);
        } else {
          console.log(`Email sent to ${donor.email}:`, info.response);
        }
      });
    }

    res.status(201).json({ message: 'Blood request created and donors notified', request: newRequest });
  } catch (err) {
    console.error('Error creating blood request:', err);
    res.status(500).json({ message: 'Server error while creating blood request' });
  }
};

// @desc    Get all open blood requests (for donors to browse)
export const getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ status: 'open' }).populate('hospital', 'name location');
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests' });
  }
};

// Update blood request status (e.g., fulfilled or cancelled)
export const updateBloodRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['open', 'fulfilled', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status value' });
  }

  try {
    const request = await BloodRequest.findById(id);

    if (!request) {
      return res.status(404).json({ message: 'Blood request not found' });
    }

    // Make sure the user updating is the owner hospital
    if (req.user.id !== request.hospital.toString()) {
      return res.status(403).json({ message: 'Unauthorised to update this request' });
    }

    request.status = status;
    await request.save();

    res.json({ message: 'Status updated', request });
  } catch (err) {
    console.error('Status update error:', err);
    res.status(500).json({ message: 'Server error updating status' });
  }
};

// @desc    Get blood requests made by the logged-in hospital
export const getHospitalRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ hospital: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch hospital requests' });
  }
};

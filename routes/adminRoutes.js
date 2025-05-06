// routes/adminRoutes.js
import express from 'express';
import verifyToken from '../middleware/auth.js';
import { getAdminStats } from '../controllers/adminController.js';

const router = express.Router();

router.get('/stats', verifyToken, getAdminStats);

export default router;

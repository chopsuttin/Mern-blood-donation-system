// 🔐 Load environment variables before anything else
import dotenv from 'dotenv';
dotenv.config();

// 🌐 Import dependencies
import express from 'express';
import cors from 'cors';

// 🔌 Import database connection function
import connectDB from './config/db.js';

//Initialise express app
const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB (uses MONGO_URL from .env)
connectDB();

//Middlewares
app.use(cors()); // allow requests from frontend
app.use(express.json()); // parse JSON request bodies

// Import routes
import donorRoutes from './routes/donorRoutes.js';
import hospitalRoutes from './routes/hospitalRoutes.js';
import bloodRequestRoutes from './routes/bloodRequestRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

//API routes
app.use('/api/donors', donorRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/blood-requests', bloodRequestRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/admin', adminRoutes);

// Root route to test if server is live
app.get('/', (req, res) => {
  res.send('🚀 Blood Donation API is running...');
});

//Production static file serving
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

//Start the server
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
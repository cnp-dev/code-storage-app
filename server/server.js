import dotenv from 'dotenv';
dotenv.config(); // Load environment variables first

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/auth.js';
import codeRoutes from './routes/codes.js';
import viewerRoutes from './routes/viewers.js';

const app = express();

// ✅ Allow Frontend (React) to Access Backend
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:3000", // Use env variable for flexibility
  credentials: true, // Allows cookies if needed
};
app.use(cors(corsOptions));

app.use(express.json());

// ✅ Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Atlas connected successfully');
  } catch (err) {
    console.error('❌ MongoDB Atlas connection error:', err);
    process.exit(1);
  }
};
connectDB();

// Handle MongoDB connection events
mongoose.connection.on("connected", () => console.log("🟢 MongoDB connected"));
mongoose.connection.on("error", (err) => console.error("🔴 MongoDB error:", err));
mongoose.connection.on("disconnected", () => console.log("🟡 MongoDB disconnected"));

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/codes', codeRoutes);
app.use('/api/viewers', viewerRoutes);

// ✅ Default Route (For Testing)
app.get('/', (req, res) => {
  res.send('Backend is running...');
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));

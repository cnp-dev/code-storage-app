import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import codeRoutes from './routes/codes.js';
import viewerRoutes from './routes/viewers.js';

dotenv.config();
const app = express();

// ✅ Allow Frontend (React) to Access Backend
const corsOptions = {
  origin: "http://localhost:3000", // Change this to your frontend URL in production
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
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

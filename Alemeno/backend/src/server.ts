// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import courseRoutes from './routes/courseRoutes';
import studentRoutes from './routes/studentRoutes';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Define CORS options
const corsOptions = {
  origin: "*",
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // Allow cookies to be sent across domains if needed
};

app.use(cors(corsOptions)); // Apply CORS middleware
app.use(express.json()); // Parse incoming JSON requests

mongoose.connect(process.env.MONGO_URI as string, {
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

//API routes
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

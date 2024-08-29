// src/server.ts
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import courseRoutes from './routes/courseRoutes';
import studentRoutes from './routes/studentRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string, {
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

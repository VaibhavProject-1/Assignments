// src/models/courseModel.ts
import mongoose, { Schema, Document, Types } from 'mongoose';

interface ISyllabusItem {
  week: number;
  topic: string;
  content: string;
}

export interface ICourse extends Document {
  name: string;
  instructor: string;
  description: string;
  enrollmentStatus: 'Open' | 'Closed' | 'In Progress';
  thumbnail: string;
  duration: string;
  schedule: string;
  location: string;
  prerequisites: string[];
  syllabus: ISyllabusItem[];
  students: Types.ObjectId[]; // Reference to Student model
  likedBy: Types.ObjectId[];
}

const SyllabusItemSchema: Schema = new Schema({
  week: Number,
  topic: String,
  content: String,
});

const CourseSchema: Schema = new Schema({
  name: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  enrollmentStatus: { type: String, enum: ['Open', 'Closed', 'In Progress'], required: true },
  thumbnail: { type: String, required: true },
  duration: { type: String, required: true },
  schedule: { type: String, required: true },
  location: { type: String, required: true },
  prerequisites: { type: [String], required: true },
  syllabus: { type: [SyllabusItemSchema], required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  likedBy: { type: [Types.ObjectId], ref: 'Student' },
});

export default mongoose.model<ICourse>('Course', CourseSchema);
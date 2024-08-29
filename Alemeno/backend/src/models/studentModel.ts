import mongoose, { Schema, Document, Types } from 'mongoose';

// Define the ICourseProgress interface
interface ICourseProgress {
  courseId: mongoose.Types.ObjectId;
  progress: number;
  completed: boolean;
}

// Define the IStudent interface extending mongoose Document
export interface IStudent extends Document {
  name: string;
  email: string;
  enrolledCourses: ICourseProgress[];
  likedCourses: mongoose.Types.ObjectId[];
}

// Define the CourseProgress schema
const CourseProgressSchema: Schema = new Schema({
  courseId: { type: mongoose.Types.ObjectId, ref: 'Course', required: true },
  progress: { type: Number, default: 0, required: true },
  completed: { type: Boolean, default: false },
});

// Define the Student schema
const StudentSchema: Schema<IStudent> = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  enrolledCourses: { type: [CourseProgressSchema], default: [] },
  likedCourses: { type: [mongoose.Types.ObjectId], ref: 'Course', default: [] },
});

// Add a virtual field for `id`
StudentSchema.virtual('id').get(function() {
  return (this._id as mongoose.Types.ObjectId).toString();
});

// Ensure virtual fields are serialized
StudentSchema.set('toJSON', { virtuals: true });
StudentSchema.set('toObject', { virtuals: true });

export default mongoose.model<IStudent>('Student', StudentSchema);
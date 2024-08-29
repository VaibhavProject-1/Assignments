// src/routes/studentRoutes.ts
import { Router } from 'express';
import {
  registerStudent,
  getStudentDetails,
  enrollStudentInCourse,
  markCourseAsCompleted,
  likeCourse,
  getStudentEnrolledCoursesByEmail,
} from '../controllers/studentController';

const router = Router();

// Register a new student
router.post('/register', registerStudent);

// Get student details by student ID
router.get('/:studentId', getStudentDetails);

// Get courses enrolled by student email
router.get('/email/:email/courses', getStudentEnrolledCoursesByEmail);

// Enroll a student in a course
router.post('/enroll', enrollStudentInCourse);

// Mark a course as completed
router.post('/complete', markCourseAsCompleted);

// Like a course (requires courseId and studentEmail in the request body)
router.post('/courses/:courseId/like', likeCourse);

export default router;
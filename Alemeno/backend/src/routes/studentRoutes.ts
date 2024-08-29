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

router.post('/register', registerStudent);
router.get('/:studentId', getStudentDetails);
router.get('/email/:email/courses', getStudentEnrolledCoursesByEmail);
router.post('/enroll', enrollStudentInCourse);
router.post('/complete', markCourseAsCompleted);
router.post('/like', likeCourse);

export default router;
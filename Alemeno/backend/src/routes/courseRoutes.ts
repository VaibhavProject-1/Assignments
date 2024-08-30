// src/routes/courseRoutes.ts
import { Router } from 'express';
import {
  getCourses,
  getCourseById,
  enrollStudentInCourse,
  likeCourse,
  completeCourse
} from '../controllers/courseController';

const router = Router();


//Getting all courses
router.get('/', getCourses);

//Getting a specific course
router.get('/:id', getCourseById);

//Enrolling for a course
router.post('/:courseId/enroll', enrollStudentInCourse);

//Liking a course
router.post('/:courseId/like', likeCourse);

//Marking a course as completed
router.post('/:courseId/complete', completeCourse);

export default router;
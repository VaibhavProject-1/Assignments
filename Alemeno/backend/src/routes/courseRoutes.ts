// src/routes/courseRoutes.ts
import { Router } from 'express';
import {
  getCourses,
  getCourseById,
  enrollStudentInCourse,
  likeCourse
} from '../controllers/courseController';

const router = Router();

router.get('/', getCourses);
router.get('/:id', getCourseById);
router.post('/:courseId/enroll', enrollStudentInCourse);
router.post('/:courseId/like', likeCourse);

export default router;
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
router.post('/enroll', enrollStudentInCourse);
router.post('/like', likeCourse);

export default router;
import express from 'express';
import { loginUser, getStudentByEmail } from '../controllers/authController';

const router = express.Router();

// Route for logging in the user
router.post('/login', loginUser);

// Route for fetching student data by email
router.get('/students/email/:email', getStudentByEmail);

export default router;
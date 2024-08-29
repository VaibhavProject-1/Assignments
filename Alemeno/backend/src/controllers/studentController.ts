// src/controllers/studentController.ts
import { Request, Response } from 'express';
import Student, { IStudent } from '../models/studentModel';
import Course from '../models/courseModel';

// Register or login a student
export const registerStudent = async (req: Request, res: Response) => {
  const { email, name } = req.body;

  try {
    let student = await Student.findOne({ email });

    if (!student) {
      student = new Student({ email, name, enrolledCourses: [] });
      await student.save();
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get student details
export const getStudentDetails = async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.studentId).populate('enrolledCourses.courseId'); // Populate courses
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get enrolled courses for a student
export const getStudentEnrolledCoursesByEmail = async (req: Request, res: Response) => {
  const { email } = req.params;

  try {
    const student = await Student.findOne({ email }).populate('enrolledCourses.courseId');

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.status(200).json(student.enrolledCourses);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Enroll a student in a course
export const enrollStudentInCourse = async (req: Request, res: Response) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: 'Student or Course not found' });
    }

    // Check and update enrolledCourses in Student
    const enrolledCourse = student.enrolledCourses.find((ec) => ec.courseId.toString() === courseId);
    if (!enrolledCourse) {
      student.enrolledCourses.push({
        courseId,
        progress: 0,
        completed: false,
      });
      await student.save();
    }

    // Update students in Course
    if (!course.students.includes(studentId)) {
      course.students.push(studentId);
      await course.save();
    }

    res.status(200).json({ message: 'Enrollment successful', student, course });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Mark a course as completed
export const markCourseAsCompleted = async (req: Request, res: Response) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the course in the student's enrolled courses
    const enrolledCourse = student.enrolledCourses.find((ec) => ec.courseId.toString() === courseId);

    if (enrolledCourse) {
      enrolledCourse.completed = true;
      await student.save();
    } else {
      return res.status(404).json({ message: 'Course not found in student’s enrolled courses' });
    }

    res.status(200).json({ message: 'Course marked as completed', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// Like a course by a student
export const likeCourse = async (req: Request, res: Response) => {
  const { studentId, courseId } = req.body;

  try {
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: 'Student or Course not found' });
    }

    // Add course to likedCourses array if not already liked
    if (!student.likedCourses.includes(courseId)) {
      student.likedCourses.push(courseId);
      await student.save();
    }

    res.status(200).json({ message: 'Course liked successfully', student });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
// src/controllers/courseController.ts
import { Request, Response } from 'express';
import Course from '../models/courseModel';
import Student from '../models/studentModel';


// src/controllers/courseController.ts
export const getStudentCourses = async (req: Request, res: Response) => {
    try {
      const student = await Student.findById(req.params.studentId).populate('enrolledCourses');
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      res.status(200).json(student.enrolledCourses);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
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
  
      // Add course to student's enrolledCourses array if not already enrolled
      if (!student.enrolledCourses.includes(courseId)) {
        student.enrolledCourses.push(courseId);
        await student.save();
      }
  
      // Add student to course's students array if not already enrolled
      if (!course.students.includes(studentId)) {
        course.students.push(studentId);
        await course.save();
      }
  
      res.status(200).json({ message: 'Enrollment successful', student, course });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };

  // src/controllers/courseController.ts
export const likeCourse = async (req: Request, res: Response) => {
    const { studentId, courseId } = req.body;
  
    try {
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Add student to likedBy array if not already liked
      if (!course.likedBy.includes(studentId)) {
        course.likedBy.push(studentId);
        await course.save();
      }
  
      res.status(200).json({ message: 'Course liked', course });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
  

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      res.json(course);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const addCourse = async (req: Request, res: Response) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
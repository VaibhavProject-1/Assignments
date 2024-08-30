// src/controllers/courseController.ts
import { Request, Response } from 'express';
import Course from '../models/courseModel';
import Student from '../models/studentModel';
import mongoose ,{ Types } from 'mongoose';


// Utility function to check ObjectId validity
const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

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
  

  //Fetching all courses
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
  const { studentEmail, courseId } = req.body;
  //console.log("Received Payload: ", req.body);

  try {
    // Validate courseId
    if (!Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ message: 'Invalid courseId' });
    }

    // Find student and course by their IDs
    const student = await Student.findOne({ email: studentEmail }).exec();
    const course = await Course.findById(courseId).exec();

    if (!student || !course) {
      return res.status(404).json({ message: 'Student or Course not found' });
    }

    // Ensure enrolledCourses and students are arrays
    student.enrolledCourses = student.enrolledCourses || [];
    course.students = course.students || [];

    // Check if student is already enrolled in the course
    const enrolledCourse = student.enrolledCourses.find(ec => ec.courseId.toString() === courseId);
    if (enrolledCourse) {
      return res.status(400).json({ message: 'Student already enrolled in this course' });
    }

    // Add course to student's enrolledCourses
    student.enrolledCourses.push({
      courseId: new mongoose.Types.ObjectId(courseId),
      progress: 0,
      completed: false,
    });

    // Add student to course's students list
    const studentId = student._id as Types.ObjectId;
    course.students.push(studentId);

    // Save updates
    await student.save();
    await course.save();

    res.status(200).json({ message: 'Enrollment successful', student, course });
  } catch (error) {
    console.error('Failed to enroll student in course:', error);

    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    res.status(500).json({ message: 'Server error', error: errorMessage });
  }
};

// Enroll a student in a course
export const likeCourse = async (req: Request, res: Response) => {
  const { courseId, studentEmail } = req.body;
  //console.log('Received Payload for like:', req.body);

  if (!mongoose.Types.ObjectId.isValid(courseId)) {
    return res.status(400).json({ message: 'Invalid courseId' });
  }

  try {
    const student = await Student.findOne({ email: studentEmail }).exec();
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const studentId = student._id as mongoose.Types.ObjectId;
    const course = await Course.findById(courseId).exec();
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Initialize the students array if it's undefined
    if (!Array.isArray(course.students)) {
      //console.log("Initializing 'students' array");
      course.students = [];
    } else {
      // Sanitize the students array
      course.students = course.students.filter(id => mongoose.Types.ObjectId.isValid(id as any));
    }
    //console.log('Sanitized students array:', course.students);

    // Check if likedBy is undefined or contains any undefined values, and initialize if necessary
    if (!Array.isArray(course.likedBy) || course.likedBy.some(id => id === undefined)) {
      //console.log("Initializing 'likedBy' array");
      course.likedBy = [];
    } else {
      // Filter out any undefined values if they exist
      course.likedBy = course.likedBy.filter(id => id !== undefined);
    }

    //console.log('Initial likedBy:', course.likedBy);

    // Transform any non-ObjectId items in the likedBy array
    course.likedBy = course.likedBy.map(id => (id instanceof mongoose.Types.ObjectId ? id : new mongoose.Types.ObjectId(id)));
    //console.log('Transformed likedBy:', course.likedBy);

    // Check if student already liked the course
    if (!course.likedBy.includes(studentId)) {
      course.likedBy.push(studentId);
      await course.save();
      //console.log('Course liked successfully');
      return res.status(200).json({ message: 'Course liked successfully' });
    } else {
      //console.log('Student already liked the course');
      return res.status(400).json({ message: 'Course already liked' });
    }
  } catch (error) {
    console.error('Failed to like course:', error);
    return res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};


//Marking a course as complete
export const completeCourse = async (req: Request, res: Response) => {
  const { studentEmail } = req.body;
  const { courseId } = req.params;

  try {
    const student = await Student.findOne({ email: studentEmail });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const enrolledCourse = student.enrolledCourses.find(ec => ec.courseId.toString() === courseId);
    if (!enrolledCourse) {
      return res.status(404).json({ message: 'Course not enrolled' });
    }

    // Mark the course as completed and set progress to 100
    enrolledCourse.progress = 100;
    enrolledCourse.completed = true;

    await student.save();

    res.status(200).json({ message: 'Course marked as completed' });
  } catch (error) {
    console.error('Error marking course as completed:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};



//Fetch a specific course
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
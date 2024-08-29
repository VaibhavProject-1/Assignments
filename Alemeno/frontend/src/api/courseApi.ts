// api/courseApi.ts
import axios from 'axios';
import { Course } from '../types/courseTypes';
import { fetchCourseImage } from '../services/unsplashService'; // Ensure this import is correct


const API_URL = `${process.env.REACT_APP_API_URL}/courses`;

export const fetchCourses = async (): Promise<Course[]> => {
    const response = await axios.get<Course[]>(API_URL);
    const courses = response.data;
  
    // Add image URL to each course
    for (const course of courses) {
      course.imageUrl = await fetchCourseImage(course.name, course.instructor);
    }
  
    return courses;
  };
  
  export const fetchCourseById = async (id: string) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  };

// export const fetchEnrolledCourses = async (studentId: string) => {
//     const response = await axios.get(`${API_URL}/${studentId}/courses`);
//     return response.data;
//   };
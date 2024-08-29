// api/studentApi.ts
import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL}/students`;

export const fetchEnrolledCourses = async (studentId: string) => {
  const response = await axios.get(`${API_URL}/${studentId}/courses`);
  return response.data;
};

export const fetchStudentDetails = async (studentId: string) => {
    const response = await axios.get(`${API_URL}/${studentId}`);
    return response.data;
  };
  
  export const enrollStudentInCourse = async (studentId: string, courseId: string) => {
    const response = await axios.post(`${API_URL}/enroll`, { studentId, courseId });
    return response.data;
  };
  
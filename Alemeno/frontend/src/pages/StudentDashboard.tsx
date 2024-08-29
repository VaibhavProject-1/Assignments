// src/pages/StudentDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchCourseImage } from '../services/unsplashService'; // Ensure this import path is correct

interface Course {
  _id: string;
  name: string;
  instructor: string;
  thumbnail: string;
  dueDate: string;
  progress: number;
  imageUrl?: string; // Optional field to hold the fetched image URL
  location?: string;
  schedule?: string;
  description?: string;
}

interface EnrolledCourse {
  _id: string;
  courseId: Course; // Course details should be under courseId
  progress: number;
  dueDate: string;
  completed: boolean;
}

interface StudentDashboardProps {
  email: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ email }) => {
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        // Fetch enrolled courses from the backend
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/students/email/${email}/courses`);
        const courses = response.data;

        // Fetch images for each course
        const coursesWithImages = await Promise.all(
          courses.map(async (course: EnrolledCourse) => {
            const imageUrl = await fetchCourseImage(course.courseId.name, course.courseId.instructor);
            return { ...course, courseId: { ...course.courseId, imageUrl } };
          })
        );

        setEnrolledCourses(coursesWithImages);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [email]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>
      {enrolledCourses.length === 0 ? (
        <p>No courses enrolled.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map(enrolledCourse => (
            <li key={enrolledCourse._id} className="p-4 border border-gray-300 rounded-lg shadow-md bg-white">
              <h2 className="text-xl font-semibold mb-2">{enrolledCourse.courseId.name}</h2>
              <p className="text-gray-500 mb-4">Instructor: {enrolledCourse.courseId.instructor}</p>
              <div className="flex items-start mb-4">
                <img
                  src={enrolledCourse.courseId.imageUrl || 'https://via.placeholder.com/150'}
                  alt={enrolledCourse.courseId.name}
                  className="w-48 h-32 object-cover rounded-lg mr-4"
                />
                <div className="flex flex-col space-y-2">
                  <p><strong>Location:</strong> {enrolledCourse.courseId.location || 'N/A'}</p>
                  <p><strong>Schedule:</strong> {enrolledCourse.courseId.schedule || 'N/A'}</p>
                  <p><strong>Description:</strong> {enrolledCourse.courseId.description || 'N/A'}</p>
                </div>
              </div>
              <div className="flex flex-col space-y-1">
                <p><strong>Due Date:</strong> {enrolledCourse.dueDate || 'N/A'}</p>
                <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500 rounded-full"
                    style={{ width: `${enrolledCourse.progress}%` }}
                  ></div>
                </div>
                <p className="text-right text-sm text-gray-500">Progress: {enrolledCourse.progress}%</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;
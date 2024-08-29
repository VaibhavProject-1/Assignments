// src/components/StudentDashboard.tsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEnrolledCourses } from '../redux/slices/studentSlice'; // Adjust import path
import { RootState, AppDispatch } from '../redux/store';

interface StudentDashboardProps {
  studentId: string;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ studentId }) => {
  const dispatch: AppDispatch = useDispatch();
  const { enrolledCourses, loading, error } = useSelector((state: RootState) => state.student);

  useEffect(() => {
    dispatch(fetchEnrolledCourses(studentId));
  }, [dispatch, studentId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <ul>
        {enrolledCourses.map(course => (
          <li key={course._id} className="mb-4">
            <h2 className="text-lg font-semibold">{course.name}</h2>
            <p className="text-gray-600">{course.instructor}</p>
            <img src={course.thumbnail} alt={course.name} className="w-32 h-32 object-cover" />
            <p>Due Date: {course.dueDate}</p>
            <progress value={course.progress} max="100"></progress>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;

// src/components/EnrollButton.tsx
import React from 'react';
import { enrollStudentInCourse } from '../api/studentApi';

interface EnrollButtonProps {
  studentId: string;
  courseId: string;
}

const EnrollButton: React.FC<EnrollButtonProps> = ({ studentId, courseId }) => {
  const handleEnroll = async () => {
    try {
      await enrollStudentInCourse(studentId, courseId);
      alert('Enrolled successfully');
    } catch (error) {
      alert('Failed to enroll');
    }
  };

  return <button onClick={handleEnroll}>Enroll</button>;
};

export default EnrollButton;
// src/components/CourseCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface CourseCardProps {
  courseId: string;
  name: string;
  instructor: string;
  imageUrl?: string;
  description?: string;
  progress?: number; // Optional for enrolled courses
  completed?: boolean; // Optional for enrolled courses
}

const CourseCard: React.FC<CourseCardProps> = ({
  courseId,
  name,
  instructor,
  imageUrl,
  description,
  progress,
  completed,
}) => {
  return (
    <Link
      to={`/course/${courseId}`}
      className="course-card transform hover:scale-105 transition-transform duration-300 bg-white shadow-lg rounded-lg overflow-hidden"
    >
      <img
        src={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{name}</h2>
        <p className="text-sm text-gray-600 mb-2">Instructor: {instructor}</p>
        {description && <p className="text-gray-700 line-clamp-3">{description}</p>}
      </div>
      {(progress !== undefined || completed !== undefined) && (
        <div className="bg-gray-100 p-4">
          {progress !== undefined && <p className="text-gray-500 mb-4">Progress: {progress}%</p>}
          {completed !== undefined && <p className="text-gray-500 mb-4">Completed: {completed ? 'Yes' : 'No'}</p>}
        </div>
      )}
    </Link>
  );
};

export default CourseCard;
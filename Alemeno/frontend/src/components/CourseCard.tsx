// src/components/CourseCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

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
  const darkMode = useSelector((state: RootState) => state.theme.darkMode); // Access the dark mode state

  return (
    <Link
      to={`/course/${courseId}`}
      className={`course-card transform hover:scale-105 transition-transform duration-300 shadow-lg rounded-lg overflow-hidden ${
        darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'
      }`}
    >
      <img
        src={imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
        alt={name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{name}</h2>
        <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Instructor: {instructor}</p>
        {description && <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} line-clamp-3`}>{description}</p>}
      </div>
      {(progress !== undefined || completed !== undefined) && (
        <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
          {progress !== undefined && <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Progress: {progress}%</p>}
          {completed !== undefined && <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>Completed: {completed ? 'Yes' : 'No'}</p>}
        </div>
      )}
    </Link>
  );
};

export default CourseCard;

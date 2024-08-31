// src/components/CourseCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import ProgressBar from './ProgressBar';

interface CourseCardProps {
  courseId: string;
  name: string;
  instructor: string;
  description: string;
  imageUrl?: string;
  progress?: number;
  completed?: boolean;
  likeCount?: number;
  duration?: string;  // Assume duration is provided in "X weeks" or "X days"
}

const CourseCard: React.FC<CourseCardProps> = ({
  courseId,
  name,
  instructor,
  description,
  imageUrl,
  progress,
  completed,
  likeCount,
  duration,  // Duration as string "X weeks" or "X days"
}) => {
  const darkMode = useSelector((state: RootState) => state.theme?.darkMode || false);

  // Calculate due date
  const calculateDueDate = (duration: string | undefined): string | undefined => {
    if (duration) {
      const currentDate = new Date();
      const [amount, unit] = duration.split(' ');

      if (unit.startsWith('week')) {
        currentDate.setDate(currentDate.getDate() + parseInt(amount) * 7);
      } else if (unit.startsWith('day')) {
        currentDate.setDate(currentDate.getDate() + parseInt(amount));
      }

      return currentDate.toDateString();  
    }
    return undefined;
  };

  const dueDate = calculateDueDate(duration);

  return (
    <Link to={`/course/${courseId}`} className="block">
      <div
        className={`course-card shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer ${
          darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <img
          src={imageUrl || 'https://via.placeholder.com/150'}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          <p className="font-medium mb-4">{instructor}</p>
          <p className="mb-4 line-clamp-3">{description}</p>
          {dueDate && (
            <p className="font-semibold mb-2 text-red-600">Due Date: {dueDate}</p>
          )}
          {progress !== undefined && (
            <div className="mb-2">
              <ProgressBar progress={progress} />
              <p className="font-semibold text-teal-600">{progress}% Complete</p>
            </div>
          )}
          {completed !== undefined && (
            <p className="font-semibold mb-2 text-green-600">Completed: {completed ? 'Yes' : 'No'}</p>
          )}
          {likeCount !== undefined && (
            <p className="font-semibold mb-2 text-yellow-600">Likes: {likeCount}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
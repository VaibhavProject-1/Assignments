// src/components/CourseDetail.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById, likeCourse, enrollStudentInCourse, markCourseCompleted } from '../redux/actions/courseActions';
import { RootState, AppDispatch } from '../redux/store';
import { useParams } from 'react-router-dom';
import { fetchCourseImage } from '../services/unsplashService';
import ProgressBar from '../components/ProgressBar';
import Spinner from '../components/Spinner';
import { SyllabusItem, Course } from '../types/courseTypes';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  const course: Course | null = useSelector((state: RootState) => state.courses?.course || null);
  const studentEmail = useSelector((state: RootState) => state.auth?.email || '');
  const isAuthenticated = useSelector((state: RootState) => state.auth?.isAuthenticated || false);
  const enrolledCourses = useSelector((state: RootState) => state.auth?.enrolledCourses || []);
  const darkMode = useSelector((state: RootState) => state.theme?.darkMode || false);
  const loading = useSelector((state: RootState) => state.courses?.loading || false);

  const [imageUrl, setImageUrl] = useState<string>('');
  const [enrollmentData, setEnrollmentData] = useState<{ progress: number; completed: boolean } | null>(null);
  const [expandedItems, setExpandedItems] = useState<number[]>([]); // State to track expanded syllabus items

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await dispatch(fetchCourseById(id));
      }
    };
    fetchData();
  }, [id, dispatch]);

  useEffect(() => {
    const getImageUrl = async () => {
      if (course) {
        const url = await fetchCourseImage(course.name, course.instructor);
        setImageUrl(url);
      }
    };
    getImageUrl();
  }, [course]);

  useEffect(() => {
    if (id && enrolledCourses.length > 0) {
      const matchingCourse = enrolledCourses.find((enrolledCourse) => enrolledCourse.courseId === id);
      if (matchingCourse) {
        setEnrollmentData({
          progress: matchingCourse.progress,
          completed: matchingCourse.completed,
        });
      }
    }
  }, [id, enrolledCourses]);

  

  const handleLikeCourse = () => {
    if (id && studentEmail) {
      dispatch(likeCourse(id, studentEmail));
    }
  };

  const handleEnrollInCourse = () => {
    if (id && studentEmail) {
      dispatch(enrollStudentInCourse(id, studentEmail));
    }
  };

  useEffect(() => {
    if (id && enrolledCourses.length > 0) {
      const matchingCourse = enrolledCourses.find((enrolledCourse) => enrolledCourse.courseId === id);
      
      if (matchingCourse) {
        setEnrollmentData({
          progress: matchingCourse.progress,
          completed: matchingCourse.completed,
        });
      }
    }
  }, [id, enrolledCourses]);
  

const handleCompleteCourse = async () => {
  if (id && studentEmail) {
      await dispatch(markCourseCompleted(id, studentEmail));
      
      // Update the local state after dispatching the action
      setEnrollmentData({ progress: 100, completed: true });
      
  }
};


  const toggleItemExpansion = (index: number) => {
    setExpandedItems(prevExpandedItems =>
      prevExpandedItems.includes(index)
        ? prevExpandedItems.filter(item => item !== index)
        : [...prevExpandedItems, index]
    );
  };

  if (loading || !course) {
    return <Spinner />;
  }

  return (
    <div
      className={`p-6 max-w-4xl mx-auto shadow-md rounded-lg ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      }`}
    >
      {/* Image Section */}
      <div className="mb-6">
        <img
          src={imageUrl || 'https://via.placeholder.com/800x400?text=No+Image'}
          alt={course.name}
          className="w-full h-60 object-cover rounded-t-lg"
        />
      </div>

      {/* Course Information */}
      <h1 className="text-3xl font-bold mb-4">{course.name}</h1>
      <p className={`text-lg font-semibold mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        Instructor: {course.instructor}
      </p>
      <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>{course.description}</p>
      <div className="mb-4">
        <p className="font-semibold">Enrollment Status:</p>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{course.enrollmentStatus}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Duration:</p>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{course.duration}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Schedule:</p>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{course.schedule}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Location:</p>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{course.location}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Prerequisites:</p>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{course.prerequisites.join(', ')}</p>
      </div>

      {/* Syllabus */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
        {course.syllabus.map((item: SyllabusItem, index: number) => (
          <div key={index} className="mb-4">
            <h3
              className="text-xl font-semibold mb-1 cursor-pointer"
              onClick={() => toggleItemExpansion(index)}
            >
              Week {item.week}: {item.topic} {expandedItems.includes(index) ? '▲' : '▼'}
            </h3>
            {expandedItems.includes(index) && (
              <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{item.content}</p>
            )}
          </div>
        ))}
      </div>

      {/* Progress and Completion */}
      {isAuthenticated && enrollmentData && (
        <>
          <div className="mb-6">
            <p className="font-semibold mb-2">Progress:</p>
            <ProgressBar progress={enrollmentData.progress} />
          </div>
          <div className="mb-6">
            <p className="font-semibold mb-2">Completed:</p>
            <p className={darkMode ? 'text-gray-300' : 'text-gray-800'}>{enrollmentData.completed ? 'Yes' : 'No'}</p>
          </div>
        </>
      )}

      {/* Buttons for Like, Enroll, and Complete */}
      <div className="mt-6 flex space-x-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleLikeCourse}
              className={`px-4 py-2 rounded hover:transition ${
                darkMode
                  ? 'bg-blue-700 text-white hover:bg-blue-800'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              Like Course
            </button>
            <button
              onClick={handleEnrollInCourse}
              className={`px-4 py-2 rounded hover:transition ${
                darkMode
                  ? 'bg-green-700 text-white hover:bg-green-800'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              Enroll in Course
            </button>
            <button
              onClick={handleCompleteCourse}
              className={`px-4 py-2 rounded hover:transition ${
                darkMode
                  ? 'bg-purple-700 text-white hover:bg-purple-800'
                  : 'bg-purple-500 text-white hover:bg-purple-600'
              }`}
            >
              Mark as Completed
            </button>
          </>
        ) : (
          <p className="text-red-500">Please log in to interact with this course.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
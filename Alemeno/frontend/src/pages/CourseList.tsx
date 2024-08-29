// // src/components/CourseList.js
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCourses } from '../redux/actions/courseActions';
// import { subscribeToLikes } from '../api/realtimeApi';

// const CourseList = () => {
//   const dispatch = useDispatch();
//   const courses = useSelector(state => state.courses);

//   useEffect(() => {
//     dispatch(fetchCourses());
//     const unsubscribe = subscribeToLikes(updatedCourses => {
//       dispatch({ type: 'UPDATE_COURSES', payload: updatedCourses });
//     });
//     return () => unsubscribe();
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Course List</h1>
//       <input type="text" placeholder="Search by course name or instructor" />
//       <ul>
//         {courses.map(course => (
//           <li key={course.id}>
//             <a href={`/course/${course.id}`}>{course.name}</a>
//             <p>{course.instructor}</p>
//             <p>Likes: {course.likes}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CourseList;

// src/components/CourseList.tsx


import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../api/courseApi';
import { fetchCourseImage } from '../services/unsplashService';
import { Course } from '../types/courseTypes';
import { Link } from 'react-router-dom';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        const coursesWithImages = await Promise.all(
          data.map(async (course: Course) => {
            const imageUrl = await fetchCourseImage(course.name, course.instructor);
            return { ...course, imageUrl };
          })
        );
        setCourses(coursesWithImages);
        setFilteredCourses(coursesWithImages); // Initialize filtered courses with all courses
      } catch (error) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  useEffect(() => {
    // Filter courses based on search query
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = courses.filter(course =>
      course.name.toLowerCase().includes(lowercasedQuery) ||
      course.instructor.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="course-list px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Course List</h1>
      
      {/* Search Input */}
      <div className="mb-8 flex justify-center">
        <input
          type="text"
          placeholder="Search by course name or instructor"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-lg p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Course Cards */}
      <div className="course-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <Link key={course._id} to={`/course/${course._id}`} className="course-card transform hover:scale-105 transition-transform duration-300 bg-white shadow-lg rounded-lg overflow-hidden">
              <img
                src={course.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={course.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2">{course.name}</h2>
                <p className="text-sm text-gray-600 mb-2">Instructor: {course.instructor}</p>
                <p className="text-gray-700 line-clamp-3">{course.description}</p>
              </div>
              <div className="bg-gray-100 p-4">
                <button className="text-blue-500 font-semibold hover:text-blue-600">View Details</button>
              </div>
            </Link>
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;

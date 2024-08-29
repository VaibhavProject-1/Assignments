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


// src/pages/CourseList.tsx
import React, { useEffect, useState } from 'react';
import { fetchCourses } from '../api/courseApi';
import { fetchCourseImage } from '../services/unsplashService';
import { Course } from '../types/courseTypes';
import { Link } from 'react-router-dom';

const CourseList: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
      } catch (error) {
        setError('Failed to fetch courses');
      } finally {
        setLoading(false);
      }
    };

    getCourses();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="course-list">
      <h1 className="text-3xl font-bold mb-6">Course List</h1>
      <div className="course-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Link key={course._id} to={`/course/${course._id}`} className="course-card bg-white shadow-md rounded-lg overflow-hidden">
            <img
              src={course.imageUrl || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={course.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">{course.name}</h2>
              <p className="text-gray-600">{course.instructor}</p>
              <p className="mt-2 text-gray-800 truncate">{course.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CourseList;

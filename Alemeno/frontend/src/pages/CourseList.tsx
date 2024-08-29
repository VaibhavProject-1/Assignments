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
import CourseCard from '../components/CourseCard';
import { Course } from '../types/courseTypes';

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
            <CourseCard
              key={course._id}
              courseId={course._id}
              name={course.name}
              instructor={course.instructor}
              imageUrl={course.imageUrl}
              description={course.description}
            />
          ))
        ) : (
          <p>No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default CourseList;

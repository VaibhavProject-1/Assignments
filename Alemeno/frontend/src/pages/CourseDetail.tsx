// // src/components/CourseDetail.tsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchCourseById } from '../redux/courseSlice';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '../redux/store';

// const CourseDetail: React.FC = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const course = useSelector((state: RootState) => state.courses.selectedCourse);
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     if (id) {
//       dispatch(fetchCourseById(id));
//     }
//   }, [id, dispatch]);

//   if (!course) return <div>Loading...</div>;

//   return (
//     <div>
//       <h1>{course.name}</h1>
//       <h2>Instructor: {course.instructor}</h2>
//       <p>{course.description}</p>
//       <p>Status: {course.enrollmentStatus}</p>
//       <p>Duration: {course.duration}</p>
//       <p>Schedule: {course.schedule}</p>
//       <p>Location: {course.location}</p>
//       <p>Prerequisites: {course.prerequisites.join(', ')}</p>
//       <button onClick={() => setExpanded(!expanded)}>
//         {expanded ? 'Hide Syllabus' : 'Show Syllabus'}
//       </button>
//       {expanded && (
//         <ul>
//           {course.syllabus.map((item, index) => (
//             <li key={index}>
//               Week {item.week}: {item.topic} - {item.content}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CourseDetail;



import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseById, likeCourse, enrollStudentInCourse } from '../redux/actions/courseActions';
import { RootState, AppDispatch } from '../redux/store';
import { useParams } from 'react-router-dom';
import { fetchCourseImage } from '../services/unsplashService';
import ProgressBar from '../components/ProgressBar';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const course = useSelector((state: RootState) => state.courses.course);
  const [imageUrl, setImageUrl] = useState<string>('');
  const studentEmail = useSelector((state: RootState) => state.auth.email);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const enrolledCourses = useSelector((state: RootState) => state.auth.enrolledCourses);

  const [enrollmentData, setEnrollmentData] = useState<{ progress: number; completed: boolean } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await dispatch(fetchCourseById(id)); // Await the dispatch if it's an async thunk
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
      dispatch(likeCourse(id, studentEmail)); // Pass courseId and studentEmail
    }
  };

  const handleEnrollInCourse = () => {
    if (id && studentEmail) {
      dispatch(enrollStudentInCourse(id, studentEmail)); // Pass courseId and studentEmail
    }
  };

  if (!course) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
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
      <p className="text-lg font-semibold text-gray-700 mb-2">Instructor: {course.instructor}</p>
      <p className="text-gray-800 mb-4">{course.description}</p>
      <div className="mb-4">
        <p className="font-semibold">Enrollment Status:</p>
        <p className="text-gray-800">{course.enrollmentStatus}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Duration:</p>
        <p className="text-gray-800">{course.duration}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Schedule:</p>
        <p className="text-gray-800">{course.schedule}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Location:</p>
        <p className="text-gray-800">{course.location}</p>
      </div>
      <div className="mb-4">
        <p className="font-semibold">Prerequisites:</p>
        <p className="text-gray-800">{course.prerequisites.join(', ')}</p>
      </div>

      {/* Conditionally Render Progress Bar and Enrollment Details */}
      {isAuthenticated && enrollmentData && (
        <>
          <div className="mb-6">
            <p className="font-semibold mb-2">Progress:</p>
            <ProgressBar progress={enrollmentData.progress} />
          </div>
          <div className="mb-6">
            <p className="font-semibold mb-2">Completed:</p>
            <p className="text-gray-800">{enrollmentData.completed ? 'Yes' : 'No'}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Syllabus</h2>
            {course.syllabus.map((item, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold mb-1">
                  Week {item.week}: {item.topic}
                </h3>
                <p className="text-gray-800">{item.content}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Buttons for Like and Enroll */}
      <div className="mt-6 flex space-x-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={handleLikeCourse}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Like Course
            </button>
            <button
              onClick={handleEnrollInCourse}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Enroll in Course
            </button>
          </>
        ) : (
          <p className="text-red-500">Please log in to like or enroll in this course.</p>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
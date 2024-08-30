// src/pages/StudentDashboard.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import CourseCard from '../components/CourseCard';
import SearchBar from '../components/SearchBar';
import { fetchCourseImage } from '../services/unsplashService';

interface Course {
  _id: string;
  name: string;
  instructor: string;
  thumbnail: string;
  description: string;
  location?: string;
  schedule?: string;
  imageUrl?: string;
  likeCount: number; 
  progress?: number; 
  completed?: boolean;
  likedBy: string[];
}

const StudentDashboard: React.FC = () => {
  const [courseDetails, setCourseDetails] = useState<Course[]>([]);
  const [likedCourseDetails, setLikedCourseDetails] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [filteredLikedCourses, setFilteredLikedCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const enrolledCourses = useSelector((state: RootState) => state.auth.enrolledCourses);
  const likedCourses = useSelector((state: RootState) => state.auth.likedCourses);
  const studentName = useSelector((state: RootState) => state.auth.name);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const details = await Promise.all(
        enrolledCourses.map(async (enrolledCourse) => {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${enrolledCourse.courseId}`);
          const courseData = response.data;

          // Fetch the course image
          const imageUrl = await fetchCourseImage(courseData.name, courseData.instructor);

          return { ...courseData, imageUrl }; // Add imageUrl to the course data
        })
      );
      setCourseDetails(details);
      setFilteredCourses(details); // Initialize filtered courses with all enrolled courses
    };

    if (enrolledCourses.length > 0) {
      fetchCourseDetails();
    }
  }, [enrolledCourses]);

  useEffect(() => {
    const fetchLikedCourseDetails = async () => {
      const details = await Promise.all(
        likedCourses.map(async (courseId) => {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/courses/${courseId}`);
          const courseData = response.data;

          // Fetch the course image
          const imageUrl = await fetchCourseImage(courseData.name, courseData.instructor);

          return { ...courseData, imageUrl }; // Add imageUrl to the course data
        })
      );
      setLikedCourseDetails(details);
      setFilteredLikedCourses(details); // Initialize filtered liked courses with all liked courses
    };

    if (likedCourses.length > 0) {
      fetchLikedCourseDetails();
    }
  }, [likedCourses]);

  useEffect(() => {
    // Filter enrolled courses based on search query
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = courseDetails.filter(course =>
      course.name.toLowerCase().includes(lowercasedQuery) ||
      course.instructor.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredCourses(filtered);

    // Filter liked courses based on search query
    const filteredLiked = likedCourseDetails.filter(course =>
      course.name.toLowerCase().includes(lowercasedQuery) ||
      course.instructor.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredLikedCourses(filteredLiked);
  }, [searchQuery, courseDetails, likedCourseDetails]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {studentName}</h1>

      {/* Search Bar */}
      <SearchBar 
        searchQuery={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Search for enrolled or liked courses"
      />

      <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
      {filteredCourses.length === 0 ? (
        <p>You are not enrolled in any courses.</p>
      ) : (
        <div className="course-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course, index) => (
            <CourseCard
              key={course._id}
              courseId={course._id}
              name={course.name}
              instructor={course.instructor}
              imageUrl={course.imageUrl}
              description={course.description}
              progress={enrolledCourses[index].progress}
              completed={enrolledCourses[index].completed}
              likeCount={course.likedBy.length} // Pass the like count to the CourseCard
            />
          ))}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 mt-6">Liked Courses</h2>
      {filteredLikedCourses.length === 0 ? (
        <p>You haven't liked any courses yet.</p>
      ) : (
        <div className="course-cards grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredLikedCourses.map((course) => (
            <CourseCard
              key={course._id}
              courseId={course._id}
              name={course.name}
              instructor={course.instructor}
              imageUrl={course.imageUrl}
              description={course.description}
              likeCount={course.likedBy.length} // Pass the like count to the CourseCard
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
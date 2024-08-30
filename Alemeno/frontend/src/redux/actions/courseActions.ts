// src/redux/actions/courseActions.ts
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AppDispatch } from '../store';
import {
  COURSE_ACTION_TYPES,
  
  CourseActionTypes
} from '../../types/courseTypes';
import { fetchCourses as fetchCoursesApi, fetchCourseById as fetchCourseByIdApi } from '../../api/courseApi';

export const fetchCourses = (): ThunkAction<void, RootState, unknown, CourseActionTypes> => {
  return async (dispatch: Dispatch<CourseActionTypes>) => {
    dispatch({ type: COURSE_ACTION_TYPES.FETCH_COURSES_REQUEST });
    try {
      const courses = await fetchCoursesApi();
      dispatch({
        type: COURSE_ACTION_TYPES.FETCH_COURSES_SUCCESS,
        payload: courses,
      });
      toast.success('Courses fetched successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({
        type: COURSE_ACTION_TYPES.FETCH_COURSES_FAILURE,
        payload: errorMessage,
      });
      toast.error(`Failed to fetch courses: ${errorMessage}`);
    }
  };
};

export const fetchCourseById = (id: string): ThunkAction<void, RootState, unknown, CourseActionTypes> => {
  return async (dispatch: Dispatch<CourseActionTypes>) => {
      dispatch({ type: COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_REQUEST });
      try {
          const course = await fetchCourseByIdApi(id);
          console.log("Dispatching FETCH_COURSE_BY_ID_SUCCESS with payload:", course);
          dispatch({
              type: COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_SUCCESS,
              payload: course,
          });
          toast.success('Course details fetched successfully!');
      } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
          dispatch({
              type: COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_FAILURE,
              payload: errorMessage,
          });
          toast.error(`Failed to fetch course details: ${errorMessage}`);
      }
  };
};



export const markCourseCompleted = (courseId: string, studentEmail: string) => async (dispatch: AppDispatch) => {
  try {
    await axios.post(`${process.env.REACT_APP_API_URL}/courses/${courseId}/complete`, { studentEmail });
    dispatch({ type: COURSE_ACTION_TYPES.MARK_COURSE_COMPLETED, payload: { courseId } });
  } catch (error) {
    console.error('Failed to complete course', error);
  }
};

export const likeCourse = (courseId: string, studentEmail: string) => async (dispatch: AppDispatch) => {
  try {
    console.log("Course ID: ", courseId);
    console.log("Student Email: ", studentEmail);
    await axios.post(`${process.env.REACT_APP_API_URL}/courses/${courseId}/like`, { courseId, studentEmail });
    dispatch({ type: 'COURSE_LIKED', payload: { courseId } });
    toast.success('Course liked successfully!');
  } catch (error) {
    console.error('Failed to like course:', error);

    let errorMessage = 'An unknown error occurred';

    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      // General error handling
      errorMessage = error.message;
    }

    toast.error(`Failed to like course: ${errorMessage}`);
  }
};




export const enrollStudentInCourse = ( courseId: string,studentEmail: string,) => async (dispatch: AppDispatch) => {
  try {
    console.log("Course ID: ", courseId);
    console.log("Student email: ", studentEmail);
    await axios.post(`${process.env.REACT_APP_API_URL}/courses/${courseId}/enroll`, { studentEmail, courseId });
    dispatch({ type: 'COURSE_ENROLLED', payload: { studentEmail, courseId } });
    toast.success('Enrolled in course successfully!');
  } catch (error) {
    console.error('Failed to enroll course:', error);

    let errorMessage = 'An unknown error occurred';

    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      errorMessage = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      // General error handling
      errorMessage = error.message;
    }

    toast.error(`Failed to enroll course: ${errorMessage}`);
  }
};
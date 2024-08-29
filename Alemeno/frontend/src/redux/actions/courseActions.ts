// src/redux/actions/courseActions.ts
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import axios from 'axios';
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
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({
        type: COURSE_ACTION_TYPES.FETCH_COURSES_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

export const fetchCourseById = (id: string): ThunkAction<void, RootState, unknown, CourseActionTypes> => {
  return async (dispatch: Dispatch<CourseActionTypes>) => {
    dispatch({ type: COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_REQUEST });
    try {
      const course = await fetchCourseByIdApi(id);
      dispatch({
        type: COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_SUCCESS,
        payload: course,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({
        type: COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_FAILURE,
        payload: errorMessage,
      });
    }
  };
};


export const likeCourse = (courseId: string, studentEmail: string) => async (dispatch: AppDispatch) => {
  try {
    console.log("Course ID: ", courseId);
    console.log("Student Email: ", studentEmail);
    await axios.post(`${process.env.REACT_APP_API_URL}/courses/${courseId}/like`, { courseId, studentEmail });
    dispatch({ type: 'COURSE_LIKED', payload: { courseId } });
  } catch (error) {
    console.error('Failed to like course', error);
  }
};




export const enrollStudentInCourse = ( courseId: string,studentEmail: string,) => async (dispatch: AppDispatch) => {
  try {
    console.log("Course ID: ", courseId);
    console.log("Student email: ", studentEmail);
    await axios.post(`${process.env.REACT_APP_API_URL}/courses/${courseId}/enroll`, { studentEmail, courseId });
    dispatch({ type: 'COURSE_ENROLLED', payload: { studentEmail, courseId } });
  } catch (error) {
    console.error('Failed to enroll in course:', error);
  }
};



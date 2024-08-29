// src/redux/actions/courseActions.ts
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
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
// src/redux/actions/studentActions.ts
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import {
  STUDENT_ACTION_TYPES,
  StudentActionTypes
} from '../types/studentTypes';
import { fetchEnrolledCourses as fetchEnrolledCoursesApi } from '../../api/studentApi';

export const fetchEnrolledCourses = (studentId: string): ThunkAction<void, RootState, unknown, StudentActionTypes> => {
  return async (dispatch: Dispatch<StudentActionTypes>) => {
    dispatch({ type: STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_REQUEST });
    try {
      const courses = await fetchEnrolledCoursesApi(studentId);
      dispatch({
        type: STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_SUCCESS,
        payload: courses,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      dispatch({
        type: STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_FAILURE,
        payload: errorMessage,
      });
    }
  };
};

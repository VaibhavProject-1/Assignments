// src/redux/thunks/studentThunks.ts
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store';
import { fetchEnrolledCoursesByEmail } from '../../api/studentApi'; // Adjusted import to use email function
import { STUDENT_ACTION_TYPES, StudentActionTypes } from '../types/studentTypes';

export const fetchEnrolledCoursesThunk = (email: string): ThunkAction<void, RootState, unknown, StudentActionTypes> => {
  return async (dispatch) => {
    dispatch({ type: STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_REQUEST });
    try {
      const courses = await fetchEnrolledCoursesByEmail(email); // Use email instead of studentId
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
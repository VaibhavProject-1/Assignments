// src/redux/reducers/studentReducer.ts

import { StudentState, STUDENT_ACTION_TYPES } from '../types/studentTypes';

const initialState: StudentState = {
  enrolledCourses: [],
  loading: false,
  error: null,
};

const studentReducer = (state = initialState, action: any): StudentState => {
  switch (action.type) {
    case STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_REQUEST:
      return { ...state, loading: true };
    case STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_SUCCESS:
      return { ...state, loading: false, enrolledCourses: action.payload };
    case STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default studentReducer;

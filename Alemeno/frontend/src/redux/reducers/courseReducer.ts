// src/redux/reducers/courseReducer.ts

import {
    COURSE_ACTION_TYPES,
    CourseState,
  } from '../../types/courseTypes';
  
  const initialState: CourseState = {
    courses: [],
    course: null,
    loading: false,
    error: null,
  };
  
  const courseReducer = (state = initialState, action: any): CourseState => {
    switch (action.type) {
      case COURSE_ACTION_TYPES.FETCH_COURSES_REQUEST:
        return { ...state, loading: true };
      case COURSE_ACTION_TYPES.FETCH_COURSES_SUCCESS:
        return { ...state, loading: false, courses: action.payload };
      case COURSE_ACTION_TYPES.FETCH_COURSES_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_REQUEST:
        return { ...state, loading: true };
      case COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_SUCCESS:
        return { ...state, loading: false, course: action.payload };   
      case COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case COURSE_ACTION_TYPES.MARK_COURSE_COMPLETED:
          if (state.course && state.course._id === action.payload.courseId) {
            return {
              ...state,
              course: {
                ...state.course,
                progress: 100,
                completed: true,
              },
            };
          }
          return state;  
      default:
        return state;
    }
  };
  
  export default courseReducer;
  
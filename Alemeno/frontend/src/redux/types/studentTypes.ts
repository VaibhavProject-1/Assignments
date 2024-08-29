// src/types/studentTypes.ts
import { Action } from 'redux';

// Define action types
export enum STUDENT_ACTION_TYPES {
  FETCH_ENROLLED_COURSES_REQUEST = 'FETCH_ENROLLED_COURSES_REQUEST',
  FETCH_ENROLLED_COURSES_SUCCESS = 'FETCH_ENROLLED_COURSES_SUCCESS',
  FETCH_ENROLLED_COURSES_FAILURE = 'FETCH_ENROLLED_COURSES_FAILURE',
}

// Define action interfaces
export interface FetchEnrolledCoursesRequestAction extends Action<typeof STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_REQUEST> {}

export interface FetchEnrolledCoursesSuccessAction extends Action<typeof STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_SUCCESS> {
  payload: any[]; // Replace with actual type for courses
}

export interface FetchEnrolledCoursesFailureAction extends Action<typeof STUDENT_ACTION_TYPES.FETCH_ENROLLED_COURSES_FAILURE> {
  payload: string;
}

// Combine action types
export type StudentActionTypes =
  | FetchEnrolledCoursesRequestAction
  | FetchEnrolledCoursesSuccessAction
  | FetchEnrolledCoursesFailureAction;

// Define the state interface
export interface StudentState {
  enrolledCourses: any[]; // Replace with actual type for courses
  loading: boolean;
  error: string | null;
}

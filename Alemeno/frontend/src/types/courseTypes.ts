// src/types/courseTypes.ts

export interface SyllabusItem {
    week: number;
    topic: string;
    content: string;
  }
  

export interface Course {
    _id: string;
    name: string;
    instructor: string;
    description: string;
    enrollmentStatus: string;
    duration: string;
    schedule: string;
    location: string;
    imageUrl?: string;
    prerequisites: string[];
    syllabus: SyllabusItem[];
    thumbnail: string;
    dueDate: string;
    progress: number;
  }
  
  export interface CourseState {
    courses: Course[];
    course: Course | null;
    loading: boolean;
    error: string | null;
  }
  
  export enum COURSE_ACTION_TYPES {
    FETCH_COURSES_REQUEST = 'FETCH_COURSES_REQUEST',
    FETCH_COURSES_SUCCESS = 'FETCH_COURSES_SUCCESS',
    FETCH_COURSES_FAILURE = 'FETCH_COURSES_FAILURE',
    FETCH_COURSE_BY_ID_REQUEST = 'FETCH_COURSE_BY_ID_REQUEST',
    FETCH_COURSE_BY_ID_SUCCESS = 'FETCH_COURSE_BY_ID_SUCCESS',
    FETCH_COURSE_BY_ID_FAILURE = 'FETCH_COURSE_BY_ID_FAILURE',
  }
  
  export interface FetchCoursesRequestAction {
    type: COURSE_ACTION_TYPES.FETCH_COURSES_REQUEST;
  }
  
  export interface FetchCoursesSuccessAction {
    type: COURSE_ACTION_TYPES.FETCH_COURSES_SUCCESS;
    payload: Course[];
  }
  
  export interface FetchCoursesFailureAction {
    type: COURSE_ACTION_TYPES.FETCH_COURSES_FAILURE;
    payload: string;
  }
  
  export interface FetchCourseByIdRequestAction {
    type: COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_REQUEST;
  }
  
  export interface FetchCourseByIdSuccessAction {
    type: COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_SUCCESS;
    payload: Course;
  }
  
  export interface FetchCourseByIdFailureAction {
    type: COURSE_ACTION_TYPES.FETCH_COURSE_BY_ID_FAILURE;
    payload: string;
  }
  
  export type CourseActionTypes =
    | FetchCoursesRequestAction
    | FetchCoursesSuccessAction
    | FetchCoursesFailureAction
    | FetchCourseByIdRequestAction
    | FetchCourseByIdSuccessAction
    | FetchCourseByIdFailureAction;
  
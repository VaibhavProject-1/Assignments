// src/redux/courseSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseState, Course } from '../types/courseTypes';

const initialState: CourseState = {
  courses: [],
  course: null,
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: 'course',
  initialState,
  reducers: {
    fetchCoursesRequest: (state) => {
      state.loading = true;
    },
    fetchCoursesSuccess: (state, action: PayloadAction<Course[]>) => {
      state.loading = false;
      state.courses = action.payload;
    },
    fetchCoursesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCourseByIdRequest: (state) => {
      state.loading = true;
    },
    fetchCourseByIdSuccess: (state, action: PayloadAction<Course>) => {
      state.loading = false;
      state.course = action.payload;
    },
    fetchCourseByIdFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCoursesRequest,
  fetchCoursesSuccess,
  fetchCoursesFailure,
  fetchCourseByIdRequest,
  fetchCourseByIdSuccess,
  fetchCourseByIdFailure,
} = courseSlice.actions;

export default courseSlice.reducer;

// Adding an empty export statement to ensure module status
export {};

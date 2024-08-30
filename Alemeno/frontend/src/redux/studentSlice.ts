// src/redux/studentSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentState } from '../redux/types/studentTypes';

const initialState: StudentState = {
  enrolledCourses: [],
  loading: false,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    fetchEnrolledCoursesRequest: (state) => {
      state.loading = true;
    },
    fetchEnrolledCoursesSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.enrolledCourses = action.payload;
    },
    fetchEnrolledCoursesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchEnrolledCoursesRequest,
  fetchEnrolledCoursesSuccess,
  fetchEnrolledCoursesFailure,
} = studentSlice.actions;

export default studentSlice.reducer;

// Adding an empty export statement to ensure module status
export {};

// // src/redux/courseSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// interface CourseState {
//   courses: Course[];
//   selectedCourse: Course | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: CourseState = {
//   courses: [],
//   selectedCourse: null,
//   loading: false,
//   error: null,
// };

// export const fetchCourses = createAsyncThunk(
//   'courses/fetchCourses',
//   async () => {
//     const response = await axios.get('/api/courses');
//     return response.data;
//   }
// );

// export const fetchCourseById = createAsyncThunk(
//   'courses/fetchCourseById',
//   async (courseId: string) => {
//     const response = await axios.get(`/api/courses/${courseId}`);
//     return response.data;
//   }
// );

// const courseSlice = createSlice({
//   name: 'courses',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchCourses.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCourses.fulfilled, (state, action) => {
//         state.loading = false;
//         state.courses = action.payload;
//       })
//       .addCase(fetchCourses.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch courses';
//       })
//       .addCase(fetchCourseById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchCourseById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.selectedCourse = action.payload;
//       })
//       .addCase(fetchCourseById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch course';
//       });
//   },
// });

// export default courseSlice.reducer;

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

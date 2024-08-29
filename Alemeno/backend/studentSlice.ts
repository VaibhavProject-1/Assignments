// // src/redux/studentSlice.ts
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { Course } from './types';

// interface CourseProgress {
//   courseId: string;
//   progress: number;
//   completed: boolean;
// }

// interface StudentState {
//   student: {
//     _id: string;
//     name: string;
//     enrolledCourses: CourseProgress[];
//   } | null;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: StudentState = {
//   student: null,
//   loading: false,
//   error: null,
// };

// export const fetchStudentInfo = createAsyncThunk(
//   'student/fetchStudentInfo',
//   async (studentId: string) => {
//     const response = await axios.get(`/api/students/${studentId}`);
//     return response.data;
//   }
// );

// export const enrollInCourse = createAsyncThunk(
//   'student/enrollInCourse',
//   async (courseId: string, { getState }) => {
//     const state = getState() as { student: StudentState };
//     const studentId = state.student.student?._id || '';
//     const response = await axios.post('/api/students/enroll', { studentId, courseId });
//     return response.data;
//   }
// );

// const studentSlice = createSlice({
//   name: 'student',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStudentInfo.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchStudentInfo.fulfilled, (state, action) => {
//         state.loading = false;
//         state.student = action.payload;
//       })
//       .addCase(fetchStudentInfo.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to fetch student info';
//       })
//       .addCase(enrollInCourse.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(enrollInCourse.fulfilled, (state, action) => {
//         state.loading = false;
//         // Update state with new enrolled courses if needed
//       })
//       .addCase(enrollInCourse.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.error.message || 'Failed to enroll in course';
//       });
//   },
// });

// export default studentSlice.reducer;


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

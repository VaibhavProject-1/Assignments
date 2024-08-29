// src/redux/slices/studentSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchEnrolledCoursesByEmail as fetchEnrolledCoursesApi } from '../../api/studentApi'; // Adjusted import to use email function

// Define the initial state and type
interface StudentState {
  enrolledCourses: any[]; // Replace with the correct type
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: StudentState = {
  enrolledCourses: [],
  loading: false,
  error: null,
};

// Define async thunk
export const fetchEnrolledCourses = createAsyncThunk<
  any[], // Return type of the payload
  string, // Type of the parameter (email)
  { rejectValue: string } // Type of the reject value
>(
  'student/fetchEnrolledCourses',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetchEnrolledCoursesApi(email); // Use email instead of studentId
      return response;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  }
);

// Create the slice
const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.enrolledCourses = action.payload;
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'An unknown error occurred';
      });
  },
});

export default studentSlice.reducer;
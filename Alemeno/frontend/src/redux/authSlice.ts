// // src/redux/authSlice.ts
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface AuthState {
//   isAuthenticated: boolean;
//   email: string | null;
//   name: string | null;
//   token: string | null; // Add a token if needed
// }

// const initialState: AuthState = {
//   isAuthenticated: false,
//   email: null,
//   name: null,
//   token: null, // Initialize token as null
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state, action: PayloadAction<{ email: string; name: string; token?: string }>) => {
//       state.isAuthenticated = true;
//       state.email = action.payload.email;
//       state.name = action.payload.name;
//       state.token = action.payload.token || null; // Store token if provided
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.email = null;
//       state.name = null;
//       state.token = null;
//     },
//   },
// });

// export const { login, logout } = authSlice.actions;
// export default authSlice.reducer;


// src/redux/authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Define the error interface
interface FetchStudentError {
  message: string;
}

export const fetchStudentData = createAsyncThunk<
  AuthState, // The return type of the fulfilled action
  string, // The argument type for the thunk
  {
    rejectValue: FetchStudentError; // The type of the error payload
  }
>(
  'auth/fetchStudentData',
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/students/email/${email}`);
      return response.data; // This should be the student data
    } catch (error: any) {
      let errorMessage = 'Failed to fetch student data';
      if (axios.isAxiosError(error) && error.response) {
        errorMessage = error.response.data.message || errorMessage;
      }
      return rejectWithValue({ message: errorMessage });
    }
  }
);


// Define the EnrolledCourse interface
interface EnrolledCourse {
  courseId: string;  // Reference to the Course _id
  progress: number;
  completed: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
  token: string | null;
  enrolledCourses: EnrolledCourse[]; 
  likedCourses: any[]; 
}


const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  name: null,
  token: null,
  enrolledCourses: [],
  likedCourses: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string; token?: string }>) => {
      console.log('Login action dispatched', action.payload);
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.token = action.payload.token || null;
    },
    logout: (state) => {
      console.log('Logout action dispatched');
      state.isAuthenticated = false;
      state.email = null;
      state.name = null;
      state.token = null;
      state.enrolledCourses = [];
      state.likedCourses = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStudentData.fulfilled, (state, action) => {
      state.enrolledCourses = action.payload.enrolledCourses;
      state.likedCourses = action.payload.likedCourses;
      toast.success('Student data fetched successfully!');
    });
    builder.addCase(fetchStudentData.rejected, (state, action) => {
      const error = action.payload as FetchStudentError;
      toast.error(`Failed to fetch student data: ${error.message}`);
    });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

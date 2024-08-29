// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import courseReducer from './reducers/courseReducer';
import studentReducer from './reducers/studentReducer';
import authReducer from './authSlice'; // Import the authSlice reducer

const store = configureStore({
  reducer: {
    courses: courseReducer,
    student: studentReducer,
    auth: authReducer, // Add the auth reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
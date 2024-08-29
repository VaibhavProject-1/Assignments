// src/redux/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  name: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  email: null,
  name: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ email: string; name: string }>) => {
      state.isAuthenticated = true;
      state.email = action.payload.email;
      state.name = action.payload.name;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.name = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
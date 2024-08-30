// // src/redux/store.ts
// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // Defaults to localStorage for web
// import courseReducer from './reducers/courseReducer';
// import studentReducer from './reducers/studentReducer';
// import authReducer from './authSlice';

// // Create the root reducer
// const rootReducer = combineReducers({
//   courses: courseReducer,
//   student: studentReducer,
//   auth: authReducer, // Add the auth reducer
// });

// // Configure persist settings
// const persistConfig = {
//   key: 'root',
//   storage, // Use localStorage to persist data
//   whitelist: ['auth'], // Persist only the auth slice
// };

// // Create the persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// // Configure the store with the persisted reducer
// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           'persist/PERSIST',
//           'persist/REHYDRATE',
//           'persist/PAUSE',
//           'persist/PURGE',
//           'persist/FLUSH',
//           'persist/REGISTER',
//         ],
//       },
//     }),
// });

// export const persistor = persistStore(store); // Export the persistor
// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export default store;


// src/redux/store.ts

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import courseReducer from './reducers/courseReducer'; // Assuming you prefer to use the courseSlice
import studentReducer from './reducers/studentReducer';
import authReducer from './authSlice';
import themeReducer from './themeSlice';

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  courses: courseReducer,    // Updated to use the course slice
  student: studentReducer,
  auth: authReducer,
  theme: themeReducer, 
});

// Define the persist configuration
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the auth slice
};

// Create a persisted reducer using the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/PAUSE',
          'persist/PURGE',
          'persist/FLUSH',
          'persist/REGISTER',
        ],
      },
    }),
});

export const persistor = persistStore(store);

// Define AppDispatch and RootState
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

// Define AppThunk for typing thunks
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
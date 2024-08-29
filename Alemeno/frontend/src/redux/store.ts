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


import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import courseReducer from './reducers/courseReducer';
import studentReducer from './reducers/studentReducer';
import authReducer from './authSlice';

const rootReducer = combineReducers({
  courses: courseReducer,
  student: studentReducer,
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

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

// Define AppDispatch correctly
export type AppDispatch = typeof store.dispatch;

// Define RootState and AppThunk
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;
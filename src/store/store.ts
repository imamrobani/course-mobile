import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth/authSlice';
import commentsReducer from './slice/comments/commentsSlice';
import counterReducer from './slice/counter/counterSlice';
import coursesReducer from './slice/courses/coursesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    counter: counterReducer,
    courses: coursesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/auth/authSlice';
import commentsReducer from './slice/comments/commentsSlice';
import counterReducer from './slice/counter/counterSlice';
import coursesReducer from './slice/courses/coursesSlice';
import favoritesReducer from './slice/favorites/favoritesSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    counter: counterReducer,
    courses: coursesReducer,
    favorites: favoritesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

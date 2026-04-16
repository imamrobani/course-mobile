import { createSlice } from '@reduxjs/toolkit';
import { mockCourses } from '@mock/courses';
import { Course } from '@type/models/course';
import type { PayloadAction } from '@reduxjs/toolkit';

type CoursesState = {
  items: Course[];
  query: string;
  category: string;
};

const initialState: CoursesState = {
  items: mockCourses,
  query: '',
  category: 'all',
};

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setQuery, setCategory } = coursesSlice.actions;

export default coursesSlice.reducer;

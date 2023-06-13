import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllCoursesApi = createAsyncThunk('courses/fetch', () => (
  new Promise((resolve, reject) => {
    axios.get('http://localhost:3000/api/v1/courses')
      .then(({ data }) => {
        resolve({ data });
      })
      .catch((error) => {
        reject(error);
      });
  })
));

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoursesApi.pending, (state) => ({
        ...state, status: 'loading', courses: [],
      }))
      .addCase(getAllCoursesApi.fulfilled, (state, { payload }) => ({
        ...state,
        courses: payload.data,
        status: 'succeeded',
      }))
      .addCase(getAllCoursesApi.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }));
  },
});

export default coursesSlice.reducer;

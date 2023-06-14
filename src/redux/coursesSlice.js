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

export const getCourseById = createAsyncThunk(
  'courses/getCourseById',
  async (id) => {
    const response = await axios.get(`http://localhost:3000/api/v1/courses/${id}`);
    return response.data;
  },
);

export const deleteCourseById = createAsyncThunk(
  'courses/deleteCourseById',
  async (id) => {
    const response = await axios.delete(`http://localhost:3000/api/v1/courses/${id}`);
    return response.data;
  },
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState: {
    courses: [],
    course: {},
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
      }))
      .addCase(getCourseById.pending, (state) => ({
        ...state, status: 'loading', course: {},
      }))
      .addCase(getCourseById.fulfilled, (state, { payload }) => ({
        ...state, loading: false, course: payload, status: 'succeed',
      }))
      .addCase(getCourseById.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }))
      .addCase(deleteCourseById.pending, (state) => ({
        ...state, status: 'loading',
      }));
  },
});

export default coursesSlice.reducer;

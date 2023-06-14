import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllCoursesApi = createAsyncThunk('games/fetch', () => (
  new Promise((resolve, reject) => {
    axios.get('http://localhost:3000/api/v1/courses')
      .then(({ data }) => {
        // console.log(data);
        resolve({ data });
      })
      .catch((error) => {
        reject(error);
      });
  })
));

export const postApiCourseForm = createAsyncThunk(
  'courses/postApiCourseForm',
  async (requestForm) => {
    const postFormToData = await axios.post('http://localhost:3000/api/v1/courses', requestForm);
    // console.log(postFormToData.data);
    return postFormToData.data;
  },
);

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
      // getAllCoursesApi
      .addCase(getAllCoursesApi.pending, (state) => ({
        ...state, status: 'loading', courses: [],
      }))
      .addCase(getAllCoursesApi.fulfilled, (state, { payload }) => ({
        ...state,
        courses: payload.array,
        status: 'succeed',
      }))
      .addCase(getAllCoursesApi.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }))

      // postApiCourseForm
      .addCase(postApiCourseForm.pending, (state) => ({
        ...state, status: 'loading', courses: [],
      }))
      .addCase(postApiCourseForm.fulfilled, (state, { payload }) => ({
        ...state,
        courses: payload.array,
        status: 'succeed',
      }))
      .addCase(postApiCourseForm.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }));
  },
});

export default coursesSlice.reducer;

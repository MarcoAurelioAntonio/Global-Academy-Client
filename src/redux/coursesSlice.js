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
    const payload = { id, response };
    return payload;
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
    deleted: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      // getAllCoursesApi
      .addCase(getAllCoursesApi.pending, (state) => ({
        ...state, status: 'loading', loading: true, courses: [],
      }))
      .addCase(getAllCoursesApi.fulfilled, (state, { payload }) => ({
        ...state,
        courses: payload.data,
        status: 'succeeded',
        loading: false,
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
        loading: false,
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
        ...state,
      }))
      .addCase(deleteCourseById.fulfilled, (state, { payload }) => {
        const { id } = payload;
        const newCourses = state.courses.filter((course) => course.id !== id);
        return {
          ...state, loading: false, courses: newCourses, deleted: true,
        };
      })
      .addCase(deleteCourseById.rejected, (state, { error }) => ({
        ...state, status: 'failed', error: error.message,
      }));
  },
});

export default coursesSlice.reducer;

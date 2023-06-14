import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllReservationsApi = createAsyncThunk(
  'api/getAllReservationsApi',
  async (userId) => {
    const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}/reservations`);
    return response.data;
  },
);

export const postReservationToAPI = createAsyncThunk(
  'reservations/postReservationToAPI',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/${data.user_id}/reservations`,
        data,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  },
);
const reservationsSlice = createSlice({
  name: 'api',
  initialState: {
    reservations: [],
    status: 'idle',
    loading: false,
    message: '',
    error: null,
    userId: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReservationToAPI.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(postReservationToAPI.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'succeed',
        message: payload.data,
      }))
      .addCase(postReservationToAPI.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        status: 'failed',
      }))
      .addCase(getAllReservationsApi.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(getAllReservationsApi.fulfilled, (state, action) => ({ ...state, status: 'succeeded', reservations: action.payload }))
      .addCase(getAllReservationsApi.rejected, (state, action) => ({ ...state, status: 'failed', error: action.error.message }));
  },
});

export default reservationsSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

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
  name: 'reservations',
  initialState: {
    reservations: [],
    status: 'idle',
    loading: false,
    message: '',
    error: null,
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
      }));
  },
});

export default reservationsSlice.reducer;

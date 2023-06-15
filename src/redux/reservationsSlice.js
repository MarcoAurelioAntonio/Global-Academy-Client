import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllReservationsApi = createAsyncThunk(
  'api/getAllReservationsApi',
  async (userId) => {
    const response = await axios.get(
      `http://localhost:3000/api/v1/users/${userId}/reservations`
    );
    return response.data;
  }
);

export const postReservationToAPI = createAsyncThunk(
  'reservations/postReservationToAPI',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/users/${data.user_id}/reservations`,
        data
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.error);
    }
  }
);
const reservationsSlice = createSlice({
  name: 'api',
  initialState: {
    reservations: [],
    status: 'idle',
    loading: false,
    error: null,
    userId: null,
    enrolled: false,
  },
  reducers: {
    reset: (state) => {
      console.log('RESET VALUES');
      return {
        ...state,
        status: 'idle',
        loading: false,
        error: null,
        userId: null,
        enrolled: false,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postReservationToAPI.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(postReservationToAPI.fulfilled, (state, { payload }) => ({
        ...state,
        status: 'succeed',
        enrolled: true,
        error: null,
        message: payload.data,
      }))
      .addCase(postReservationToAPI.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        status: 'failed',
      }))
      .addCase(getAllReservationsApi.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getAllReservationsApi.fulfilled, (state, action) => ({
        ...state,
        status: 'succeeded',
        reservations: action.payload,
      }))
      .addCase(getAllReservationsApi.rejected, (state, action) => ({
        ...state,
        status: 'failed',
        error: action.error.message,
      }));
  },
});
// Export the cations
export const { reset } = reservationsSlice.actions;
export default reservationsSlice.reducer;

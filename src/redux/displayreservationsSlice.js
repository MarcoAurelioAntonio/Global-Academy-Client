import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllReservationsApi = createAsyncThunk(
  'api/getAllReservationsApi',
  async () => {
    const response = await axios.get('http://localhost:3000/api/v1/users/3/reservations');
    // console.log(response.data);
    return response.data;
  },
);

const displayreservationsSlice = createSlice({
  name: 'api',
  initialState: {
    data: [],
    status: null,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getAllReservationsApi.pending, (state) => ({ ...state, status: 'loading' }))
      .addCase(getAllReservationsApi.fulfilled, (state, action) => ({ ...state, status: 'succeeded', data: action.payload }))
      .addCase(getAllReservationsApi.rejected, (state, action) => ({ ...state, status: 'failed', error: action.error.message }));
  },
});

export default displayreservationsSlice.reducer;
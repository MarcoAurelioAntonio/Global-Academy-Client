import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postUserToAPI = createAsyncThunk(
  'users/postUserToAPI',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/users', data);
      console.log(data);
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    current_user_id: null,
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUserToAPI.pending, (state) => ({
        ...state, status: 'loading',
      }))
      .addCase(postUserToAPI.fulfilled, (state, { payload }) => ({
        ...state,
        current_user_id: payload.id,
        status: 'succeed',
      }))
      .addCase(postUserToAPI.rejected, (state, { error }) => ({
        ...state,
        error: error.message,
        status: 'failed',
      }));
  },
});

export default usersSlice.reducer;

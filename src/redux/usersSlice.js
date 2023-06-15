import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postUserToAPI = createAsyncThunk(
  'users/postUserToAPI',
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users',
        data,
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.name[0]);
    }
  },
);

export const getUserFromAPI = createAsyncThunk(
  'users/getUserFromAPI',
  async (username, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/users/${username}`,
      );
      return response.data;
    } catch (error) {
      const msg = error.response.data.error
      return thunkAPI.rejectWithValue(msg);
    }
  },
);

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    current_user: null,
    status: 'idle',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postUserToAPI.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(postUserToAPI.fulfilled, (state, { payload }) => ({
        ...state,
        current_user: payload,
        status: 'succeed',
        error: null,
      }))
      .addCase(postUserToAPI.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        status: 'failed',
      }))
      .addCase(getUserFromAPI.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(getUserFromAPI.fulfilled, (state, { payload }) => ({
        ...state,
        current_user: payload,
        status: 'succeed',
        error: null,
      }))
      .addCase(getUserFromAPI.rejected, (state, action) => ({
        ...state,
        error: action.payload,
        status: 'failed',
      }));
  },
});

export default usersSlice.reducer;

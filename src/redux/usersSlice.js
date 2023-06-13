import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postUserToAPI = createAsyncThunk('post/user', () => (
  new Promise((resolve, reject) => {
    axios.get('http://localhost:3000/api/v1/users')
      .then(({ data }) => {
        console.log(data);
        resolve({ data });
      })
      .catch((error) => {
        reject(error);
      });
  })
));

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

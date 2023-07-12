import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const postContactForm = createAsyncThunk(
  'contact/postContactForm',
  async (requestForm) => {
    const formData = new FormData();
    formData.append('contact[name]', requestForm.name);
    formData.append('contact[email]', requestForm.email);
    formData.append('contact[message]', requestForm.message);

    const postFormToData = await axios.post('http://localhost:3000/api/v1/contacts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return postFormToData.data;
  },
);

const contactSlice = createSlice({
  name: 'contact',
  initialState: {
    contact: [],
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postContactForm.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(postContactForm.fulfilled, (state, { payload }) => ({
        ...state,
        contact: payload.data,
        status: 'succeeded',
      }))
      .addCase(postContactForm.rejected, (state, { error }) => ({
        ...state,
        status: 'failed',
        error: error.message,
      }));
  },
});

export default contactSlice.reducer;

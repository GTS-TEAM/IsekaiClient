import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const data = await authApi.login(email, password);
  return data;
});

const initialState = {
  user: null,
  token: {
    accessToken: null,
    refreshToken: null,
  },
  isFetching: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error;
      });
  },
});

export default authSlice.reducer;

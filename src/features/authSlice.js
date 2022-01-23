import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

export const login = createAsyncThunk('auth/login', async ({ email, password, callback }) => {
  const data = await authApi.login(email, password);
  callback(); // navigate to homepage
  return data;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkApi) => {
  const { token } = thunkApi.getState().auth;
  const data = await authApi.updateToken(token.refreshToken);
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
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token.accessToken = null;
      state.token.refreshToken = null;
      state.isFetching = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token.accessToken = action.payload.access_token;
        state.token.refreshToken = action.payload.refresh_token;
        state.isFetching = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.error;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token.accessToken = action.payload.access_token;
        state.token.refreshToken = action.payload.refresh_token;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.token.accessToken = null;
        state.token.refreshToken = null;
      });
  },
});

export const authSelector = (state) => state.auth;
export default authSlice.reducer;

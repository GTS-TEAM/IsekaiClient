import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';

export const login = createAsyncThunk('auth/login', async ({ email, password, callback }, thunkApi) => {
  try {
    const data = await authApi.login(email, password);
    callback(); // navigate to homepage
    return data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const register = createAsyncThunk('auth/register', async ({ userName, email, password, callback }, thunkApi) => {
  try {
    const data = await authApi.register(email, password, userName);
    callback(); // navigate to login page
    return data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data);
  }
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
  errorLogin: null,
  errorRegister: null,
  messageRegister: null,
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
      state.errorLogin = null;
      state.errorRegister = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.isFetching = true;
        state.errorLogin = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token.accessToken = action.payload.access_token;
        state.token.refreshToken = action.payload.refresh_token;
        state.isFetching = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.isFetching = false;
        state.errorLogin = action.payload.message;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token.accessToken = action.payload.access_token;
        state.token.refreshToken = action.payload.refresh_token;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.token.accessToken = null;
        state.token.refreshToken = null;
      })
      .addCase(register.pending, (state) => {
        state.isFetching = true;
        state.errorRegister = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.messageRegister = action.payload.message;
        state.isFetching = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.errorRegister = action.payload.message;
        state.isFetching = false;
      });
  },
});

export const authSelector = (state) => state.auth;
export default authSlice.reducer;

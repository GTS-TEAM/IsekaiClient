import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteTokenFromLocalStorage, getTokenFromLocalStorage, setTokenToLocalStorage } from '../api/axoisClient';
import { isekaiApi } from '../api/isekaiApi';

export const loginHandler = createAsyncThunk('auth/login', async ({ email, password, callback }, thunkApi) => {
  try {
    const data = await isekaiApi.login(email, password);
    setTokenToLocalStorage(data);
    callback(); // navigate to homepage
    return data;
  } catch (err) {
    return thunkApi.rejectWithValue(err.response.data);
  }
});

export const registerHandler = createAsyncThunk(
  'auth/register',
  async ({ userName, email, password, callback }, thunkApi) => {
    try {
      const data = await isekaiApi.register(email, password, userName);
      callback(); // navigate to login page
      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err.response.data);
    }
  },
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkApi) => {
  const token = getTokenFromLocalStorage();
  deleteTokenFromLocalStorage();
  const data = await isekaiApi.updateToken(token.refreshToken);
  setTokenToLocalStorage(data);
  return data;
});

const initialState = {
  user: null,
  loading: false,
  token: {
    accessToken: null,
    refreshToken: null,
  },
  login: {
    error: null,
    loading: null,
  },
  register: {
    error: null,
    loading: null,
    message: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token.accessToken = null;
      state.token.refreshToken = null;
      state.login.error = null;
      state.register.error = null;
      state.login.loading = null;
      state.register.loading = null;
      localStorage.clear();
    },
    saveToken: (state, action) => {
      state.token.accessToken = action.payload.access_token;
      state.token.refreshToken = action.payload.refresh_token;
    },
    removeToken: (state) => {
      state.token.accessToken = null;
      state.token.refreshToken = null;
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state, action) => {
        state.login.loading = true;
        state.login.error = null;
      })
      .addCase(loginHandler.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token.accessToken = action.payload.access_token;
        state.token.refreshToken = action.payload.refresh_token;
        state.login.loading = false;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload.message;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.token.accessToken = action.payload.access_token;
        state.token.refreshToken = action.payload.refresh_token;
      })
      .addCase(registerHandler.pending, (state) => {
        state.register.loading = true;
        state.register.error = null;
      })
      .addCase(registerHandler.fulfilled, (state, action) => {
        state.register.message = action.payload.message;
        state.register.loading = false;
      })
      .addCase(registerHandler.rejected, (state, action) => {
        state.register.error = action.payload.message;
        state.register.loading = false;
      });
  },
});

export const { logout, updateProfile } = authSlice.actions;
export const authSelector = (state) => state.auth;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { isekaiApi } from '../api/isekaiApi';

export const loginHandler = createAsyncThunk('auth/login', async ({ email, password, callback }, thunkApi) => {
  try {
    const data = await isekaiApi.login(email, password);
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
  const { token } = thunkApi.getState().auth;

  const data = await isekaiApi.updateToken(token.refreshToken);
  console.log(data);
  return data;
});

const initialState = {
  user: null,
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
      state.isFetching = false;
      state.errorLogin = null;
      state.errorRegister = null;
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

export const authSelector = (state) => state.auth;
export default authSlice.reducer;

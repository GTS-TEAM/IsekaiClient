import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'share/types';
import { deleteTokenFromLocalStorage, getTokenFromLocalStorage, setTokenToLocalStorage } from '../api/axoisClient';
import { isekaiApi } from '../api/isekaiApi';
import { ResLogin, Token } from './../share/types';
import { RootState } from './../store';

interface parameterLogin {
  email: string;
  password: string;
  callback: () => any;
}

export const loginHandler = createAsyncThunk<
  ResLogin,
  parameterLogin,
  {
    rejectValue: string;
  }
>('auth/login', async (d, thunkApi) => {
  try {
    const { data } = await isekaiApi.login(d.email, d.password);
    console.log(data);
    setTokenToLocalStorage({ access_token: data.access_token, refresh_token: data.refresh_token });
    d.callback(); // navigate to homepage
    return data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data.message);
  }
});

interface parameterRegister extends parameterLogin {
  userName: string;
}

export const registerHandler = createAsyncThunk<
  { message: string },
  parameterRegister,
  {
    rejectValue: string;
  }
>('auth/register', async (d, thunkApi) => {
  try {
    const { data } = await isekaiApi.register(d.email, d.password, d.userName);
    d.callback(); // navigate to login page
    return data;
  } catch (err: any) {
    return thunkApi.rejectWithValue(err.response.data.message);
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
  const token = getTokenFromLocalStorage();
  deleteTokenFromLocalStorage();
  const { data } = await isekaiApi.updateToken(token.refresh_token || '');
  setTokenToLocalStorage({ access_token: data.access_token, refresh_token: data.refresh_token });
  return data;
});

interface InitialState {
  user: User | null;
  loading: boolean;
  token: Token;
  login: {
    error: string | null | undefined;
    loading: boolean;
  };
  register: {
    error: string | null | undefined;
    loading: boolean;
    message: string | null | undefined;
  };
}

const initialState: InitialState = {
  user: null,
  loading: false,
  token: {
    access_token: null,
    refresh_token: null,
  },
  login: {
    error: null,
    loading: false,
  },
  register: {
    error: null,
    loading: false,
    message: null,
  },
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token.access_token = null;
      state.token.refresh_token = null;
      state.login.error = null;
      state.register.error = null;
      state.login.loading = false;
      state.register.loading = false;
      localStorage.clear();
    },
    updateProfile: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginHandler.pending, (state) => {
        state.login.loading = true;
      })
      .addCase(loginHandler.fulfilled, (state, action: PayloadAction<ResLogin>) => {
        state.user = action.payload.user;
        state.token.access_token = action.payload.access_token;
        state.token.refresh_token = action.payload.refresh_token;
        state.login.loading = false;
      })
      .addCase(loginHandler.rejected, (state, action) => {
        state.login.loading = false;
        state.login.error = action.payload;
      })
      .addCase(refreshToken.fulfilled, (state, action: PayloadAction<Token>) => {
        state.token.access_token = action.payload.access_token;
        state.token.refresh_token = action.payload.refresh_token;
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
        state.register.error = action.payload;
        state.register.loading = false;
      });
  },
});

export const { logout, updateProfile } = authSlice.actions;
export const authSelector = (state: RootState) => state.auth;
export default authSlice.reducer;

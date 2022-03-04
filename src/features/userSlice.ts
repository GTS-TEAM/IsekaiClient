import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isekaiApi } from '../api/isekaiApi';
import { InfoUser, User } from './../share/types';
import { RootState } from './../store';
import { updateProfile } from './authSlice';

export const getUser = createAsyncThunk('user/getUser', async (id: string) => {
  const { data } = await isekaiApi.getUser(id);
  return data;
});

export const editUserInfo = createAsyncThunk('user/editUserInfo', async (info: InfoUser, { dispatch }) => {
  const { data } = await isekaiApi.editInfoUser(info);
  dispatch(updateProfile(data));
  return data;
});

interface InitialState {
  user: User | null;
  loading: boolean;
  error: null | string | undefined;
}

const initialState: InitialState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    unMountUser: (state) => {
      state.error = null;
      state.user = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserInfo.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export const { unMountUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.user;
export default userSlice.reducer;

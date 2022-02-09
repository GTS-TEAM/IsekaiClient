import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';
import { updateProfile } from './authSlice';

export const getUser = createAsyncThunk('user/getUser', async (id) => {
  const data = await isekaiApi.getUser(id);
  return data;
});

export const editUserInfo = createAsyncThunk('user/editUserInfo', async (info, thunkApi) => {
  const data = await isekaiApi.editInfoUser(info);
  thunkApi.dispatch(updateProfile(data));
  return data;
});

const initialState = {
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
    updateAvatar: (state, action) => {
      state.user = {
        ...state.user,
        avatar: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
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
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
  },
});

export const { unMountUser, updateAvatar } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';

export const getUser = createAsyncThunk('user/getUser', async (id) => {
  const data = await isekaiApi.getUser(id);
  return data;
});

export const editUserInfo = createAsyncThunk('user/editUserInfo', async (info) => {
  const data = await isekaiApi.editInfoUser(info);
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
      .addCase(editUserInfo.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { unMountUser } = userSlice.actions;
export const userSelector = (state) => state.user;
export default userSlice.reducer;

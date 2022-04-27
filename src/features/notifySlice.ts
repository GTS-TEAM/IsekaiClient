import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';
import { notifyItem, notifyLikeItem, responseNotify } from 'share/types';
import { RootState } from 'store';

export const initialState: {
  isLoading: Boolean;
  is_read: boolean;
  responsenotify: responseNotify | null;
  notifyItem: notifyItem[];
} = {
  isLoading: false,
  responsenotify: null,
  notifyItem: [],
  is_read: false,
};

export const getAllNotifycation = createAsyncThunk<notifyItem[]>('notif/getAllNotifycation', async () => {
  const { data } = await isekaiApi.getNotifycation();
  return data;
});

export const readNotifycation = createAsyncThunk('notif/readNotifycation', async (id: string) => {
  isekaiApi.ReadNotifycation(id);
});

const notifySlice = createSlice({
  name: 'notify',
  initialState,
  reducers: {
    addNewNotify: (state, action: PayloadAction<notifyItem>) => {
      state.notifyItem.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotifycation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNotifycation.fulfilled, (state, action: PayloadAction<notifyItem[]>) => {
      state.isLoading = false;
      state.notifyItem = action.payload;
    });
    builder.addCase(readNotifycation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(readNotifycation.fulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const notifySelector = (state: RootState) => state.notify;
export default notifySlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';
import { notifyItem, responseNotify } from 'share/types';
import { RootState } from 'store';

export const initialState: {
  isLoading: Boolean;
  responsenotify: responseNotify | null;
  notifyItem: notifyItem[];
  hasMore: boolean;
  unReaded: number;
} = {
  isLoading: false,
  responsenotify: null,
  notifyItem: [],
  hasMore: false,
  unReaded: 0,
};

export const getAllNotifycation = createAsyncThunk<
  {
    count: number;
    notifications: notifyItem[];
  },
  {
    limit: number;
    page: number;
  }
>('notif/getAllNotifycation', async ({ limit, page }) => {
  const { data } = await isekaiApi.getNotifycation(limit, page);
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
    unmountNofi: (state) => {
      state.notifyItem = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllNotifycation.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAllNotifycation.fulfilled, (state, action) => {
      if (action.payload.notifications.length === 0) {
        state.hasMore = false;
      } else {
        state.hasMore = true;
      }
      state.isLoading = false;
      state.notifyItem = [...state.notifyItem, ...action.payload.notifications].sort((a, b) => {
        return b.updated_at.localeCompare(a.updated_at);
      });
      state.unReaded = action.payload.count;
    });
  },
});

export const notifySelector = (state: RootState) => state.notify;
export const { unmountNofi } = notifySlice.actions;
export default notifySlice.reducer;

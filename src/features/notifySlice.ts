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
  count: number;
} = {
  isLoading: false,
  responsenotify: null,
  notifyItem: [],
  hasMore: false,
  unReaded: 0,
  count: 0,
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

export const getUnreadMessage = createAsyncThunk('notif/getAllConversations', async () => {
  const { data } = await isekaiApi.GetUnreadMessage();
  return data;
});

export const readNotifycation = createAsyncThunk('notif/readNotifycation', async (id: string) => {
  await isekaiApi.ReadNotifycation(id);
  return id;
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
    builder
      .addCase(getAllNotifycation.fulfilled, (state, action) => {
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
      })
      .addCase(readNotifycation.fulfilled, (state, action) => {
        const indexRead = state.notifyItem.findIndex((_item) => _item.id === action.payload);
        if (state.notifyItem[indexRead]) {
          state.notifyItem[indexRead] = {
            ...state.notifyItem[indexRead],
            is_read: true,
          };
        }
      })
      .addCase(getUnreadMessage.fulfilled, (state, action) => {
        state.count = action.payload.count;
      });
  },
});

export const notifySelector = (state: RootState) => state.notify;
export const { unmountNofi } = notifySlice.actions;
export default notifySlice.reducer;

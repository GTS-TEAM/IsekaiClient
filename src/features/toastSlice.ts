import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IToast } from 'share/types';
import { RootState } from 'store';

const initialState: {
  toasts: IToast[];
} = {
  toasts: [],
};

const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<IToast>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((_toast) => _toast.id !== action.payload);
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;
export const toastSelector = (state: RootState) => state.toast;

export default toastSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState: {
  isEstablishingConnection: boolean;
  isConnected: boolean;
} = {
  isEstablishingConnection: false,
  isConnected: false,
};

const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    startConnecting: (state) => {
      state.isEstablishingConnection = true;
    },
    connectionEstablished: (state) => {
      state.isConnected = true;
      state.isEstablishingConnection = true;
    },
    unConnect: (state) => {
      state.isConnected = false;
      state.isEstablishingConnection = false;
    },
  },
});

export const { startConnecting, connectionEstablished, unConnect } = socketSlice.actions;

export default socketSlice.reducer;

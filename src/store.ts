import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authSlice from 'features/authSlice';
import chatSlice from 'features/chatSlice';
import musicSlice from 'features/musicSlice';
import notifySlice from 'features/notifySlice';
import postsSlice from 'features/postsSlice';
import socketSlice from 'features/socketSlice';
import toastSlice from 'features/toastSlice';
import userSlice from 'features/userSlice';
import weatherSlice from 'features/weatherSlice';
import { chatMiddleware } from 'middleware';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['posts', 'auth', 'user', 'music', 'weather', 'chat', 'socket', 'notify'],
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['login', 'register', 'loading'],
};

const weatherPersistConfig = {
  key: 'weather',
  storage: storage,
  blacklist: ['loading', 'currentWeather', 'error'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  posts: postsSlice,
  user: userSlice,
  music: musicSlice,
  weather: persistReducer(weatherPersistConfig, weatherSlice),
  chat: chatSlice,
  socket: socketSlice,
  notify: notifySlice,
  toast: toastSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([chatMiddleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const persistor = persistStore(store);

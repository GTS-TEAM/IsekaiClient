import { combineReducers, configureStore } from '@reduxjs/toolkit';
import musicSlice from 'features/musicSlice';
import userSlice from 'features/userSlice';
import weatherSlice from 'features/weatherSlice';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './features/authSlice';
import chatSlice, { chatMiddleware } from './features/chatSlice';
import postsSlice from './features/postsSlice';
import uiSlice from './features/uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['posts', 'auth', 'ui', 'user', 'music', 'weather', 'chat'],
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
  ui: uiSlice,
  user: userSlice,
  music: musicSlice,
  weather: persistReducer(weatherPersistConfig, weatherSlice),
  chat: chatSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const arr: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ignoredPathsPostImg: string[] = arr.map((item) => `posts.dataPosts.image.${item}.file`);

const ignoredActionPathsMeta: string[] = arr.map((item) => `meta.arg.image.${item}.file`);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredActionPaths: ['meta.arg.0.file', 'payload.file', 'meta.arg.callback', ...ignoredActionPathsMeta],
        ignoredPaths: ['payload', ...ignoredPathsPostImg],
      },
      immutableCheck: false,
    }).concat([chatMiddleware]),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

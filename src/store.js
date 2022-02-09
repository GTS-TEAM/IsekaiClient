import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from 'features/userSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './features/authSlice';
import postsSlice from './features/postsSlice';
import uiSlice from './features/uiSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['posts', 'auth', 'ui', 'user'],
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['login', 'register'],
};

const postsPersistConfig = {
  key: 'posts',
  storage: storage,
  blacklist: ['dataPosts'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
  posts: persistReducer(postsPersistConfig, postsSlice),
  ui: uiSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const ignoredPathsPostImg = arr.map((item) => `posts.dataPosts.image.${item}.file`);

const ignoredActionPathsMeta = arr.map((item) => `meta.arg.image.${item}.file`);

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
    }),
});

export const persistor = persistStore(store);

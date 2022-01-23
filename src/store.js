import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from './features/authSlice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  wishlist: ['token', 'user'],
  blacklist: ['error', 'isFetching'],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authSlice),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

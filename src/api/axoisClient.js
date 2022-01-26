import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { refreshToken } from '../features/authSlice';
import { store } from '../store';

export const requestPrivate = axios.create({
  baseURL: 'https://isekai-api.me/api',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export const requestPublic = axios.create({
  baseURL: 'https://isekai-api.me/api',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

export const headerAuthorization = (accessToken) => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };
};

requestPrivate.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

requestPublic.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

requestPrivate.interceptors.request.use(
  async (config) => {
    const { token } = store.getState().auth;
    config.headers['authorization'] = `Bearer ${token.accessToken}`;
    let currentDate = new Date();
    if (token.accessToken) {
      const decodedToken = jwtDecode(token.accessToken);
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        await store.dispatch(refreshToken());
        if (config.headers) {
          config.headers['authorization'] = `Bearer ${store.getState().auth.token.accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

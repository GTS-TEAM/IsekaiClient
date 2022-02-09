import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { logout, refreshToken } from '../features/authSlice';
import { store } from '../store';

axios.defaults.baseURL = 'https://isekai-api.me/api';

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export const setTokenToLocalStorage = (token) => {
  localStorage.setItem('access_token', JSON.stringify(token.access_token));
  localStorage.setItem('refresh_token', JSON.stringify(token.refresh_token));
};

export const getTokenFromLocalStorage = () => {
  return {
    accessToken: JSON.parse(localStorage.getItem('access_token')),
    refreshToken: JSON.parse(localStorage.getItem('refresh_token')),
  };
};

export const deleteTokenFromLocalStorage = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
};

axios.interceptors.request.use(
  async (config) => {
    if (config.url !== '/posts/timeline/{page}') console.log(config.url);
    const token = getTokenFromLocalStorage();
    let currentDate = new Date();
    if (token) {
      if (token.accessToken) {
        config.headers['authorization'] = `Bearer ${token.accessToken}`;
        const decodedToken = jwtDecode(token.accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          await store.dispatch(refreshToken());

          if (config.headers) {
            config.headers['authorization'] = `Bearer ${JSON.parse(localStorage.getItem('access_token'))}`;
          }
        }
      }
    }
    return config;
  },
  (error) => {
    const originalRequest = error.config;
    if (originalRequest.url === '/auth/refresh-token') {
      console.log('Refresh token is expired');
      store.dispatch(logout());
      localStorage.clear();
    }
    return Promise.reject(error);
  },
);

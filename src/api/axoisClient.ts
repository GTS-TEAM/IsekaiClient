import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { logout, refreshToken } from '../features/authSlice';
import { store } from '../store';
import { TokenType } from './../share/types';

axios.defaults.baseURL = 'https://isekai-api.me/api';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const token = localStorage.getItem('token');
      if (token && refreshToken) {
        await store.dispatch(refreshToken());
      } else {
        store.dispatch(logout());
      }
    }
  },
);
export const setTokenToLocalStorage = (token: TokenType) => {
  localStorage.setItem('access_token', JSON.stringify(token.access_token));
  localStorage.setItem('refresh_token', JSON.stringify(token.refresh_token));
};

export const getTokenFromLocalStorage = (): TokenType => {
  const accessToken = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');
  if (accessToken && refreshToken) {
    return {
      access_token: JSON.parse(accessToken) as string,
      refresh_token: JSON.parse(refreshToken) as string,
    };
  }

  return {
    access_token: null,
    refresh_token: null,
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
      if (token.access_token) {
        config.headers = {
          Authorization: `Bearer ${token.access_token}`,
        };
        const decodedToken: {
          exp: number;
        } = jwtDecode(token.access_token);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          await store.dispatch(refreshToken());

          if (config.headers) {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
              config.headers['authorization'] = `Bearer ${JSON.parse(accessToken)}`;
            }
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

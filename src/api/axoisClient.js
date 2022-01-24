import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { refreshToken } from '../features/authSlice';
import { store } from '../store';

export const request = axios.create({
  baseURL: 'http://isekai-api.me/api',
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

request.interceptors.request.use(
  async (config) => {
    const { token } = store.getState().auth;
    let currentDate = new Date();
    if (token.accessToken) {
      const decodedToken = {
        exp: jwtDecode(token.accessToken),
      };
      if (decodedToken.exp.exp * 1000 < currentDate.getTime()) {
        await store.dispatch(refreshToken());
        if (config.headers) {
          config.headers['authorization'] = `Bearer ${token.accessToken}`;
        }
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

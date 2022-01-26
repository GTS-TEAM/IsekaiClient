import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { refreshToken } from '../features/authSlice';
import { store } from '../store';

axios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.request.use(
  async (config) => {
    const { token } = store.getState().auth;
    config.headers['authorization'] = `Bearer ${token.accessToken}`;
    let currentDate = new Date();
    console.log(token);
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

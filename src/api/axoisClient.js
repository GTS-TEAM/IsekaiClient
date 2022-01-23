import axios from 'axios';

export const request = axios.create({
  baseURL: 'http://159.223.67.126',
  headers: {
    'Content-Type': 'application/json',
  },
});

request.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

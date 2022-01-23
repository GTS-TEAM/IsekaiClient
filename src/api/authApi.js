import { request } from './axoisClient';

export const authApi = {
  login: (email, password) => {
    return request.post('/auth/login', {
      email,
      password,
    });
  },
  register: (email, password, userName) => {
    console.log(userName, email);
    return request.post('/auth/register', {
      username: userName,
      email,
      password,
      roles: 'user',
    });
  },
  updateToken: (refreshToken) => {
    return request.post('/auth/refresh-token', {
      refreshToken: refreshToken,
    });
  },
};

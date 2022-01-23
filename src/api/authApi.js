import { request } from './axoisClient';

export const authApi = {
  login: (email, password) => {
    return request.post('/auth/login', {
      email,
      password,
    });
  },
};

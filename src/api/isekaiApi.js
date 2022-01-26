import { requestPrivate, requestPublic } from './axoisClient';

export const isekaiApi = {
  login: (email, password) => {
    return requestPublic.post('/auth/login', {
      email,
      password,
    });
  },
  register: (email, password, userName) => {
    console.log(userName, email);
    return requestPublic.post('/auth/register', {
      username: userName,
      email,
      password,
      roles: 'user',
    });
  },
  updateToken: (refreshToken) => {
    return requestPublic.post('/auth/refresh-token', {
      refresh_token: refreshToken,
    });
  },

  createPost: (image, description, accessToken) => {
    return requestPrivate.post(
      '/posts',
      {
        image,
        description,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  editPost: (image, description, postId, accessToken) => {
    return requestPrivate.put(
      `/posts/${postId}`,
      {
        image,
        description,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  deletePost: (postId, accessToken) => {
    return requestPrivate.delete(`/posts/${postId}`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getIsLiked: (postId, accessToken) => {
    return requestPrivate.get(`/posts/${postId}/isLiked`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },

  likePost: (postId, accessToken) => {
    return requestPrivate.patch(
      `/posts/${postId}/like`,
      {},
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  getCommentsPost: (postId, accessToken) => {
    return requestPrivate.get(`/posts/${postId}/comments`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },

  commentPost: (postId, comment, accessToken) => {
    return requestPrivate.post(
      `/posts/${postId}/comments`,
      { comment },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      },
    );
  },

  getTimeline: (accessToken) => {
    return requestPrivate.get('/posts/timeline', {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },

  getUser: (id, accessToken) => {
    return requestPrivate.get('/user', {
      params: {
        userId: id,
      },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },
};

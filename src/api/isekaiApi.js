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

  createPost: (image, description) => {
    return requestPrivate.post('/posts', {
      image,
      description,
    });
  },

  editPost: (image, description, postId) => {
    return requestPrivate.put(`/posts/${postId}`, {
      image,
      description,
    });
  },

  deletePost: (postId) => {
    return requestPrivate.delete(`/posts/${postId}`);
  },

  getIsLiked: (postId) => {
    return requestPrivate.get(`/posts/${postId}/isLiked`);
  },

  likePost: (postId) => {
    return requestPrivate.patch(`/posts/${postId}/like`, {});
  },

  getCommentsPost: (postId) => {
    return requestPrivate.get(`/posts/${postId}/comments`);
  },

  commentPost: (postId, comment) => {
    return requestPrivate.post(`/posts/${postId}/comments`, { comment });
  },

  editComment: (commentId, comment) => {
    return requestPrivate.patch(`/posts/comments/${commentId}`, { comment });
  },

  deleteComment: (commentId) => {
    return requestPrivate.delete(`/posts/comments/${commentId}`);
  },

  getTimeline: () => {
    return requestPrivate.get('/posts/timeline/{page}', {
      params: {
        page: 0,
      },
    });
  },

  getUser: (id) => {
    return requestPrivate.get('/user', {
      params: {
        userId: id,
      },
    });
  },

  uploadImg: (arrFile) => {
    return requestPublic.post('/upload', arrFile);
  },
};

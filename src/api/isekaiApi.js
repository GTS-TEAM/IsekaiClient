import axios from 'axios';

export const isekaiApi = {
  login: (email, password) => {
    return axios.post('/auth/login', {
      email,
      password,
    });
  },
  register: (email, password, userName) => {
    console.log(userName, email);
    return axios.post('/auth/register', {
      username: userName,
      email,
      password,
      roles: 'user',
    });
  },
  updateToken: (refreshToken) => {
    return axios.post('/auth/refresh-token', {
      refresh_token: refreshToken,
    });
  },

  createPost: (image, description) => {
    return axios.post('/posts', {
      image,
      description,
    });
  },

  editPost: (image, description, postId) => {
    return axios.put(`/posts/${postId}`, {
      image,
      description,
    });
  },

  deletePost: (postId) => {
    return axios.delete(`/posts/${postId}`);
  },

  getIsLiked: (postId) => {
    return axios.get(`/posts/${postId}/isLiked`);
  },

  likePost: (postId) => {
    return axios.patch(`/posts/${postId}/like`, {});
  },

  getCommentsPost: (postId) => {
    return axios.get(`/posts/${postId}/comments`);
  },

  commentPost: (postId, comment) => {
    return axios.post(`/posts/${postId}/comments`, { comment });
  },

  editComment: (commentId, comment) => {
    return axios.patch(`/posts/comments/${commentId}`, { comment });
  },

  deleteComment: (commentId) => {
    return axios.delete(`/posts/comments/${commentId}`);
  },

  getTimeline: () => {
    const data = axios.get('/posts/timeline/{page}', {
      params: {
        page: 1,
      },
    });
    return data;
  },

  getUser: (id) => {
    return axios.get('/user', {
      params: {
        userId: id,
      },
    });
  },

  uploadImg: (arrFile) => {
    return axios.post('/upload', arrFile);
  },
};

import axios from 'axios';

export const isekaiApi = {
  login: (email, password) => {
    return axios.post('/auth/login', {
      email,
      password,
    });
  },
  register: (email, password, userName) => {
    return axios.post('/auth/register', {
      username: userName,
      email,
      password,
      roles: 'user',
    });
  },
  updateToken: async (refreshToken) => {
    return await axios.post('/auth/refresh-token', {
      refresh_token: refreshToken,
    });
  },

  deactivateRefreshToken: (email) => {
    return axios.post('/auth/deactivate-refresh-token', {
      email,
    });
  },

  getPost: (postId) => {
    return axios.get(`/posts/${postId}`);
  },

  createPost: (image, description, emoji) => {
    return axios.post('/posts', {
      image,
      description,
      emoji,
    });
  },

  editPost: (image, description, emoji, postId) => {
    return axios.patch(`/posts/${postId}`, {
      image,
      description,
      emoji,
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

  getCommentsPost: (postId, offset) => {
    return axios.get(`/posts/${postId}/comments`, {
      params: {
        offset,
      },
    });
  },

  getUserLikedPost: (postId) => {
    return axios.get(`/posts/${postId}/likes`);
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

  getTimeline: (page) => {
    const data = axios.get('/posts/timeline', {
      params: {
        page,
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

  getPostPhoto: (userId, type) => {
    return axios.get(`/posts/${userId}/photos`, {
      params: {
        type,
      },
    });
  },

  getUserPosts: (userId, page) => {
    return axios.get(`/posts/user/${userId}`, { params: { page } });
  },

  editInfoUser: (info) => {
    return axios.patch('/user/info', {
      ...info,
    });
  },

  uploadImg: (arrFile) => {
    return axios.post('/upload', arrFile);
  },
};

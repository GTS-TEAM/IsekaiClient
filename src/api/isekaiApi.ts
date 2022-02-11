import axios from 'axios';
import { CommentType, InfoType, PostType, ResLogin, TokenType, User } from './../share/types';

export const isekaiApi = {
  login: (email: string, password: string) => {
    return axios.post<ResLogin>('/auth/login', {
      email,
      password,
    });
  },
  register: (email: string, password: string, userName: string) => {
    return axios.post('/auth/register', {
      username: userName,
      email,
      password,
      roles: 'user',
    });
  },
  updateToken: async (refreshToken: string) => {
    return await axios.post<TokenType>('/auth/refresh-token', {
      refresh_token: refreshToken,
    });
  },

  deactivateRefreshToken: (email: string) => {
    return axios.post('/auth/deactivate-refresh-token', {
      email,
    });
  },

  getPost: (postId: string) => {
    return axios.get<PostType>(`/posts/${postId}`);
  },

  createPost: (image: string[] | [], description: string, emoji: number | null) => {
    return axios.post<PostType>('/posts', {
      image,
      description,
      emoji,
    });
  },

  editPost: (postId: string, image: string[] | [] | null, description: string, emoji: number | null) => {
    return axios.patch<{
      id: string;
      description: string;
      emoji: number | null;
      created_at: string;
      updated_at: string;
      image: string[];
    }>(`/posts/${postId}`, {
      image,
      description,
      emoji,
    });
  },

  deletePost: (postId: string) => {
    return axios.delete(`/posts/${postId}`);
  },

  getIsLiked: (postId: string) => {
    return axios.get(`/posts/${postId}/isLiked`);
  },

  likePost: (postId: string) => {
    return axios.patch(`/posts/${postId}/like`, {});
  },

  getCommentsPost: (postId: string, offset: number) => {
    return axios.get<CommentType[]>(`/posts/${postId}/comments`, {
      params: {
        offset,
      },
    });
  },

  getUserLikedPost: (postId: string) => {
    return axios.get(`/posts/${postId}/likes`);
  },

  commentPost: (postId: string, comment: string) => {
    return axios.post<CommentType>(`/posts/${postId}/comments`, { comment });
  },

  editComment: (commentId: string, comment: string) => {
    return axios.patch(`/posts/comments/${commentId}`, { comment });
  },

  deleteComment: (commentId: string) => {
    return axios.delete(`/posts/comments/${commentId}`);
  },

  getTimeline: (page: number) => {
    const data = axios.get<PostType[]>('/posts/timeline', {
      params: {
        page,
      },
    });
    return data;
  },

  getUser: (id: string) => {
    return axios.get<User>('/user', {
      params: {
        userId: id,
      },
    });
  },

  getPostPhoto: (userId: string, type: string) => {
    return axios.get(`/posts/${userId}/photos`, {
      params: {
        type,
      },
    });
  },

  getUserPosts: (userId: string, page: number) => {
    return axios.get<PostType[]>(`/posts/user/${userId}`, { params: { page } });
  },

  editInfoUser: (info: InfoType) => {
    return axios.patch<User>('/user/info', {
      ...info,
    });
  },

  uploadImg: (arrFile: FormData) => {
    return axios.post<{ urls: string[] }>('/upload', arrFile);
  },
};

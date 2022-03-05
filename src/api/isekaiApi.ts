import axios from 'axios';
import { LIMITCHAT } from 'utils/constant';
import { CommentItem, InfoUser, MessageItem, MusicItem, PostItem, ResLogin, Token, User } from './../share/types';

export const isekaiApi = {
  login: (email: string, password: string) => {
    return axios.post<ResLogin>('/auth/login', {
      email,
      password,
    });
  },
  register: (email: string, password: string, userName: string) => {
    return axios.post<{
      message: string;
    }>('/auth/register', {
      username: userName,
      email,
      password,
      roles: 'user',
    });
  },
  updateToken: async (refreshToken: string) => {
    return await axios.post<Token>('/auth/refresh-token', {
      refresh_token: refreshToken,
    });
  },

  deactivateRefreshToken: (email: string) => {
    return axios.post('/auth/deactivate-refresh-token', {
      email,
    });
  },

  getPost: (postId: string) => {
    return axios.get<PostItem>(`/posts/${postId}`);
  },

  createPost: (image: string[] | [], description: string, emoji: number | null) => {
    return axios.post<PostItem>('/posts', {
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

  getUserLikedPost: (postId: string) => {
    return axios.get(`/posts/${postId}/likes`);
  },

  getCommentsPost: (postId: string, offset: number) => {
    return axios.get<CommentItem[]>(`/posts/${postId}/comments`, {
      params: {
        offset,
      },
    });
  },

  commentPost: (postId: string, comment: string) => {
    return axios.post<CommentItem>(`/posts/${postId}/comments`, { comment });
  },

  editComment: (commentId: string, comment: string) => {
    return axios.patch(`/posts/comments/${commentId}`, { comment });
  },

  deleteComment: (commentId: string) => {
    return axios.delete(`/posts/comments/${commentId}`);
  },

  getTimeline: (page: number) => {
    const data = axios.get<PostItem[]>('/posts/timeline', {
      params: {
        page,
      },
    });
    return data;
  },

  getPostPhoto: (userId: string, type: string) => {
    return axios.get(`/posts/${userId}/photos`, {
      params: {
        type,
      },
    });
  },

  getUserPosts: (userId: string, page: number) => {
    return axios.get<PostItem[]>(`/posts/user/${userId}`, { params: { page } });
  },

  getUser: (id: string) => {
    return axios.get<User>('/user', {
      params: {
        userId: id,
      },
    });
  },

  editInfoUser: (info: InfoUser) => {
    return axios.patch<User>('/user/info', {
      ...info,
    });
  },

  changePassword: (oldPassword: string, newPassword: string) => {
    return axios.patch<{ message: string }>('/user/password', {
      oldPassword,
      newPassword,
    });
  },

  uploadImg: (arrFile: FormData) => {
    return axios.post<{ urls: string[] }>('/upload', arrFile);
  },

  uploadSongFile: (arrFile: FormData) => {
    return axios.post('/music/file', arrFile);
  },

  uploadSongUrl: (url: string) => {
    return axios.post('/music/youtube', {
      url,
    });
  },

  uploadVideoOrMusicMessage: (arrFile: FormData) => {
    return axios.post<{ urls: string[] }>('/upload/video', arrFile);
  },

  getListMusic: () => {
    return axios.get<MusicItem[]>('music');
  },

  globalSearch: (q: string) => {
    return axios.get<User[]>('search', {
      params: {
        q,
      },
    });
  },

  getAllMessage: (conversation_id: string, offset: number) => {
    return axios.get<MessageItem[]>(`conversations/message/${conversation_id}`, {
      params: {
        offset: offset,
        limit: LIMITCHAT,
      },
    });
  },
  getAllConversation: (limit: number, offset: number) => {
    return axios.get('conversations', {
      params: {
        limit,
        offset,
      },
    });
  },

  removeConversation: (conversationId: string) => {
    return axios.delete(`conversations/${conversationId}`);
  },

  getAllFiles: (conversationId: string, limit: number, offset: number, type: string) => {
    return axios.get(`conversations/${conversationId}/files`, {
      params: {
        limit: 10,
        offset,
        type,
      },
    });
  },
};

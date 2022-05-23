import axios from 'axios';
import { LIMITCHAT } from 'utils/constant';
import {
  CommentItem,
  ConversationItem,
  IFriend,
  InfoUser,
  IStatus,
  MessageItem,
  MusicItem,
  notifyItem,
  PostItem,
  ResLogin,
  Token,
  User,
} from './../share/types';

export const isekaiApi = {
  login: (email: string, password: string) => {
    return axios.post<ResLogin>('/auth/login', {
      email,
      password,
    });
  },

  //Gooogle Login api
  loginGoogle: (token: string) => {
    return axios.post<ResLogin>('/auth/google', {
      token,
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
  getAllMessageByReceiverId: (receiverId: string, offset: number) => {
    return axios.get<MessageItem[]>(`conversations/${receiverId}/messages`, {
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

  getConversationByConversationId: (conversationId: string) => {
    return axios.get<ConversationItem>(`conversations/${conversationId}`);
  },

  getConversationByReceiverId: (receiverId: string) => {
    return axios.get<ConversationItem>(`conversations/r/${receiverId}`);
  },

  removeConversation: (conversationId: string) => {
    return axios.delete(`conversations/${conversationId}`);
  },

  getAllFiles: (conversationId: string, limit: number, offset: number, type1: string, type2: string) => {
    return axios.get(`conversations/${conversationId}/files`, {
      params: {
        limit,
        offset,
        type1,
        type2,
      },
    });
  },

  addFriend: (reqId: string) => {
    return axios.post(`user/friend-request/send/${reqId}`);
  },

  getSuggestFriend: (limit = 10, offset = 1) => {
    return axios.get<IFriend[]>('user/suggest', {
      params: {
        limit,
        offset,
      },
    });
  },
  getFriendsRequest: () => {
    return axios.get<
      {
        id: string;
        created_at: string;
        updated_at: string;
        status: 'none' | 'accepted' | 'pending';
        creator: User;
      }[]
    >('user/friend-request');
  },
  getStatusFriend: (id: string) => {
    return axios.get<{ request: IStatus }>(`user/friend/status/${id}`);
  },
  responseFriendRequest: (id: string, status: 'none' | 'accepted' | 'pending') => {
    return axios.put(
      `user/friend-request/response/${id}`,
      {},
      {
        params: {
          status,
        },
      },
    );
  },
  removeFriend: (id: string) => {
    return axios.delete(`user/friends/${id}`);
  },
  getListFriend: (id: string) => {
    return axios.get<User[]>(`user/friends/${id}`);
  },

  postForgetPassword: (data: string) => {
    return axios.post('/auth/reset-password', {
      email: data,
    });
  },

  patchResetPassword: (data: { password: string; token: string }) => {
    return axios.patch('/auth/reset-password', data);
  },
  getNotifycation: (limit: number, page: number) => {
    return axios.get<{
      count: number;
      notifications: notifyItem[];
    }>('/notif', {
      params: {
        limit,
        page,
      },
    });
  },
  ReadNotifycation: (id: string) => {
    return axios.patch(`/notif/${id}`);
  },
};

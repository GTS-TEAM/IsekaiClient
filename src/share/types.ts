export interface User {
  id: string;
  username: string;
  email?: string;
  roles?: string;
  avatar: string;
  background: string | null;
  online: boolean;
  bio: string | null;
  created_at?: string;
}

export interface PostItem {
  id: string;
  description: string;
  image: string[];
  emoji: number | string | null;
  created_at: string;
  updated_at: string;
  likes: User[];
  commentCount: number;
  likeCount: number;
  liked: boolean;
  user: User;
  comments?: any;
}

export interface CommentItem {
  content: string;
  created_at: string;
  updated_at: string;
  id: string;
  user: User;
}

export interface Token {
  access_token: string | null;
  refresh_token: string | null;
}

export interface ResLogin {
  access_token: string | null;
  refresh_token: string | null;
  user: User;
}

export interface ImgUpload {
  id: string;
  url: string;
  file: File;
}

export interface EmotionItem {
  id: number;
  name: string;
  icon: any;
}

export interface InfoUser {
  username?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  background?: string;
}

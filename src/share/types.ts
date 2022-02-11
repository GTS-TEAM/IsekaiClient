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

export interface PostType {
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

export interface CommentType {
  content: string;
  created_at: string;
  updated_at: string;
  id: string;
  user: User;
}

export interface TokenType {
  access_token: string | null;
  refresh_token: string | null;
}

export interface ResLogin {
  access_token: string | null;
  refresh_token: string | null;
  user: User;
}

export interface ImgUploadType {
  id: string;
  url: string;
  file: File;
}

export interface Emotion {
  id: number;
  name: string;
  icon: any;
}

export interface InfoType {
  username?: string;
  email?: string;
  bio?: string;
  avatar?: string;
  background?: string;
}

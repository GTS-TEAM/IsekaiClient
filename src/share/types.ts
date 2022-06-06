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
  phone?: string;
  date?: string;
  address?: string;
  last_activity: string;
}

export const clientId = '113229342458-nffji5842i81t7sp50g08k4q044c8tj5.apps.googleusercontent.com';
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
  file?: File;
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
  address?: string;
  phone?: string;
  date?: string | Date;
}

export interface WeatherRes {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: string;
  current: {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    visibility: number;
    weather: {
      description: string;
      icon: string;
      id: number;
      main: number;
    }[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
  };
  daily: {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: { day: number; night: number; eve: number; morn: number };
    humidity: number;
    moon_phase: number;
    moonrise: number;
    moonset: number;
    pop: number;
    pressure: number;
    rain: number;
    sunrise: number;
    sunset: number;
    temp: { day: number; min: number; max: number; night: number; eve: number; morn: number };
    uvi: number;
    weather: {
      description: string;
      icon: string;
      id: number;
      main: string;
    }[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
  }[];
}

export interface CurrentWeather extends WeatherRes {
  locationName: string;
  country: string;
}

export interface NameLocationRes {
  country: string;
  lat: number;
  lon: number;
  name: string;
  local_names: {
    am: string;
    ar: string;
    az: string;
    be: string;
    bg: string;
    bn: string;
    bo: string;
    br: string;
    ca: string;
    cs: string;
    cv: string;
    da: string;
    de: string;
    el: string;
    en: string;
    eo: string;
    es: string;
    et: string;
    eu: string;
    fa: string;
    fi: string;
    fr: string;
    ga: string;
    gl: string;
    he: string;
    hi: string;
    hr: string;
    ht: string;
    hu: string;
    hy: string;
    is: string;
    it: string;
    ja: string;
    ka: string;
    kk: string;
    km: string;
    kn: string;
    ko: string;
    ku: string;
    lt: string;
    lv: string;
    mk: string;
    mn: string;
    mr: string;
    my: string;
    nl: string;
    oc: string;
    os: string;
    pl: string;
    pt: string;
    qu: string;
    ru: string;
    si: string;
    sk: string;
    sl: string;
    sr: string;
    sv: string;
    ta: string;
    tg: string;
    th: string;
    ug: string;
    uk: string;
    ur: string;
    vi: string;
    zh: string;
  };
}

export interface MusicItem {
  id: string;
  name: string;
  author: null | string;
  duration: number | null;
  url: string;
  create_at: string;
  uploader: User;
}

export enum ConversationType {
  PRIVATE = 'private',
  GROUP = 'group',
}

export enum ChatEvent {
  MESSAGE = 'message',
  CREATEGROUP = 'create-group',
  ADDMEMBER = 'add-members-to-group',
  LEAVEGROUP = 'leave-group',
  SEEN_MESSAGE = 'seen-message',
}

export interface Member {
  id: string;
  created_at: string;
  updated_at: string;
  nickname: null | string;
  role: string;
  deleted_conversation_at: null | string;
  user: {
    id: string;
    updated_at: string;
    username: string;
    roles: string;
    avatar: string;
    background: null | string;
    bio?: string | null;
    phone?: string | null;
    date?: string | null;
    address?: string | null;
    last_activity: string | null;
  };
}

export interface MessageItem {
  content: string;
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  conversation: ConversationItem;
  sender: Member | null;
  files: {
    id: string;
    created_at: string;
    updated_at: string;
    link: string;
    name: string;
    type: string;
  }[];
}

export interface ConversationItem {
  id: string;
  avatar: string | null;
  members: Member[];
  type: string;
  last_message: {
    content: string;
    created_at: string;
    updated_at: string;
    id: string;
    type: string;
    sender: Member | null;
  } | null;
  name: string | null;
  created_at: string;
  updated_at: string;
  theme: string | null;
  seen: ISeen[];
}

export enum MessageType {
  TEXT = 'text',
  SYSTEM = 'system',
  GIF = 'gif',
}

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  FILE = 'file',
}

export interface MemberFields {
  id: string;
  nickname?: string;
  role?: string;
}

export interface PopupItem {
  currentConversation: ConversationItem;
  receiverId: string;
}

export interface ISeen {
  id: string;
  created_at: string;
  updated_at: string;
  messageId: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
}

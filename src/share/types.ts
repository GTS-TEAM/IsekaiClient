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

export enum DefaultLocation {
  lon = Number(localStorage.getItem('longitude')) || 105.8412,
  lat = Number(localStorage.getItem('latitude')) || 21.0245,
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

export type profileOb  = {
  email:string,
  familyName:string,
  givenName:string,
  googleId:number,
  imageUrl:string, 
  name:string,
}

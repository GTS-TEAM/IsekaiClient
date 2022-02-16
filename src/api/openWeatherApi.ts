import axios from 'axios';
import { NameLocationRes, WeatherRes } from 'share/types';

const openWeatherClient = axios.create({
  baseURL: 'https://api.openweathermap.org',
  params: {
    appid: '0ef22ac6c05947776c62d457c6304fb0',
  },
});

export const openWeatherApi = {
  oneCall: (lat: number, lon: number) => {
    return openWeatherClient.get<WeatherRes>('/data/2.5/onecall', {
      params: {
        lat,
        lon,
        units: 'metric',
        lang: 'vi',
        exclude: 'minutely,hourly',
      },
    });
  },
  getNameLocation: (lat: number, lon: number) => {
    return openWeatherClient.get<NameLocationRes[]>('/geo/1.0/reverse', {
      params: {
        lat,
        lon,
        limit: 1,
      },
    });
  },
};

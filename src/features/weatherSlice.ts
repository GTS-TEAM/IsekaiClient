import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { openWeatherApi } from 'api/openWeatherApi';
import { CurrentWeather } from 'share/types';
import { RootState } from 'store';

export const getDataWeather = createAsyncThunk<
  CurrentWeather,
  void,
  {
    state: RootState;
  }
>('weather/getDataWeather', async (_, thunkApi) => {
  const { data: weather } = await openWeatherApi.oneCall(thunkApi.getState().weather.lat, thunkApi.getState().weather.lon);
  const { data: location } = await openWeatherApi.getNameLocation(
    thunkApi.getState().weather.lat,
    thunkApi.getState().weather.lon,
  );
  return {
    ...weather,
    country: location[0].country,
    locationName: location[0].local_names.vi,
  };
});

interface InitialState {
  currentWeather: CurrentWeather | null;
  lat: number;
  lon: number;
  loading: boolean;
  error: null | undefined | string;
}

const initialState: InitialState = {
  currentWeather: null,
  lat: 21.0245,
  lon: 105.8412,
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setCoords: (state, action: PayloadAction<{ lat: number; lon: number }>) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDataWeather.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDataWeather.fulfilled, (state, action: PayloadAction<CurrentWeather>) => {
        state.currentWeather = action.payload;
        state.loading = false;
      })
      .addCase(getDataWeather.rejected, (state) => {
        state.error = 'Some thing went wrong.';
        state.loading = false;
      });
  },
});

export const { setCoords } = weatherSlice.actions;
export const weatherSelector = (state: RootState) => state.weather;
export default weatherSlice.reducer;

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';
import { MusicItem } from 'share/types';
import { RootState } from 'store';

export const getListMusic = createAsyncThunk<
  MusicItem[],
  void,
  {
    rejectValue: string;
  }
>('music/getListMusic', async (_, thunkApi) => {
  try {
    const { data } = await isekaiApi.getListMusic();
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue('Something went wrong.');
  }
});

interface InitialState {
  musics: MusicItem[];
  loading: boolean;
  error: null | undefined | string;
  currentSong: null | MusicItem;
  isRandom: boolean;
  isRepeatAll: boolean;
  isRepeatOnlyOne: boolean;
  indexCurrentSong: number;
}

const initialState: InitialState = {
  musics: [],
  loading: false,
  error: null,
  currentSong: null,
  indexCurrentSong: 0,
  isRandom: false,
  isRepeatAll: false,
  isRepeatOnlyOne: false,
};

const musicSlice = createSlice({
  name: 'music',
  initialState,
  reducers: {
    nextIndexSong: (state) => {
      if (state.indexCurrentSong < state.musics.length - 1) {
        console.log('hi');
        state.indexCurrentSong++;
      } else {
        state.indexCurrentSong = 0;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListMusic.pending, (state) => {
        state.loading = true;
      })
      .addCase(getListMusic.fulfilled, (state, action: PayloadAction<MusicItem[]>) => {
        state.musics = action.payload;
        state.loading = false;
      })
      .addCase(getListMusic.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { nextIndexSong } = musicSlice.actions;
export const musicSelector = (state: RootState) => state.music;
export default musicSlice.reducer;

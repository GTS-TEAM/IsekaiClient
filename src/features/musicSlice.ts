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

export const uploadMusic = createAsyncThunk('music/upload', async () => {});

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
    skipSong: (state, action: PayloadAction<{ id: string; forward: boolean }>) => {
      let indexExit = state.musics.findIndex((music) => music.id === action.payload.id);
      if (action.payload.forward) {
        indexExit++;
        if (indexExit > state.musics.length - 1) {
          state.currentSong = state.musics[0];
        } else {
          state.currentSong = state.musics[indexExit];
        }
      } else {
        indexExit--;
        if (indexExit < 0) {
          state.currentSong = state.musics[state.musics.length - 1];
        } else {
          state.currentSong = state.musics[indexExit];
        }
      }
    },
    setCurrentSong: (state, action: PayloadAction<MusicItem>) => {
      state.currentSong = action.payload;
    },
    uploadSong: (state, action) => {
      state.musics.push(action.payload);
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
        state.currentSong = action.payload[0];
      })
      .addCase(getListMusic.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { skipSong, setCurrentSong, uploadSong } = musicSlice.actions;
export const musicSelector = (state: RootState) => state.music;
export default musicSlice.reducer;

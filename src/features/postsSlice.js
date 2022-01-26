import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isekaiApi } from '../api/isekaiApi';

export const createPost = createAsyncThunk('posts/createPost', async ({ image, description, callback }, thunkApi) => {
  const { accessToken } = thunkApi.getState().auth.token;
  await isekaiApi.createPost(image, description, accessToken);
  callback(); // implement when create post complement
});

export const getTimeline = createAsyncThunk('post/getTimeline', async (_, thunkApi) => {
  const { accessToken } = thunkApi.getState().auth.token;
  const data = await isekaiApi.getTimeline(accessToken);
  return data;
});

const initialState = {
  timeline: {
    posts: [],
    loading: false,
    error: null,
  },
  createPost: {
    loading: false,
    error: null,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    commentPost: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.createPost.loading = true;
      })
      .addCase(createPost.fulfilled, (state) => {
        state.createPost.loading = false;
      })
      .addCase(createPost.rejected, (state, action) => {
        state.createPost.loading = false;
        state.createPost.error = action.error.message;
      })
      .addCase(getTimeline.pending, (state) => {
        state.timeline.loading = true;
      })
      .addCase(getTimeline.fulfilled, (state, action) => {
        state.timeline.posts = action.payload.sort((a, b) => {
          return b.created_at.localeCompare(a.created_at);
        });
        state.timeline.error = false;
      })
      .addCase(getTimeline.rejected, (state, action) => {
        state.timeline.error = action.error.message;
        state.timeline.loading = false;
      });
  },
});

// export const {} = postsSlice.actions;
export const postsSelector = (state) => state.posts;
export default postsSlice.reducer;

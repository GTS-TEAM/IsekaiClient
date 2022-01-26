import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isekaiApi } from '../api/isekaiApi';

export const createPost = createAsyncThunk('posts/createPost', async ({ image, description, callback }) => {
  const data = await isekaiApi.createPost(image, description);
  callback(); // implement when create post complement
  return data;
});

export const editPost = createAsyncThunk('post/editPost', async ({ image, description, postId }) => {
  const data = await isekaiApi.editPost(image, description, postId);
  return data;
});

export const deletePost = createAsyncThunk('post/deletePost', async (postId) => {
  await isekaiApi.deletePost(postId);
});

export const getTimeline = createAsyncThunk('post/getTimeline', async () => {
  const data = await isekaiApi.getTimeline();
  console.log(data);
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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.createPost.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.createPost.loading = false;
        state.timeline.posts.unshift(action.payload);
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

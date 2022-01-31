import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { isekaiApi } from '../api/isekaiApi';

const uploadImg = async (files) => {
  const formData = new FormData();
  files.forEach((item) => {
    formData.append('files', item.file);
  });
  const { urls } = await isekaiApi.uploadImg(formData);
  return urls;
};

export const createPost = createAsyncThunk('posts/createPost', async ({ image, description, emoji, callback }) => {
  const urls = await uploadImg(image);
  const data = await isekaiApi.createPost(urls, description, emoji);
  callback(); // implement when create post completed
  return data;
});

export const editPost = createAsyncThunk('posts/editPost', async ({ image, description, emoji, postId, callback }) => {
  let urls = null;
  const haveId = image.some((item) => item.id);
  if (haveId) {
    console.log('implement this');
    const tempImg = [];
    urls = await uploadImg(image);
    for (const item of image) {
      if (!item.hasOwnProperty('id')) {
        tempImg.push(item);
      }
    }
    urls = [...tempImg, ...urls];
  }
  console.log("don't 'implement this");
  const data = await isekaiApi.editPost(urls ? urls : image, description, emoji, postId);
  callback(); // implement when edit post completed
  return data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (postId) => {
  await isekaiApi.deletePost(postId);
  return postId;
});

export const getTimeline = createAsyncThunk('posts/getTimeline', async ({ page }) => {
  const data = await isekaiApi.getTimeline(page);
  return data;
});

const initialState = {
  timeline: {
    posts: [],
    loading: false,
    error: null,
    hasMore: false,
  },
  dataPosts: {
    loading: false,
    error: null,
    postText: '',
    emotion: null,
    image: [],
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    changePostText: (state, action) => {
      state.dataPosts.postText = action.payload;
    },
    addPostImg: (state, action) => {
      state.dataPosts.image.push(action.payload);
    },
    addPostFullImg: (state, action) => {
      state.dataPosts.image = action.payload;
    },
    removePostImg: (state, action) => {
      state.dataPosts.image = state.dataPosts.image.filter((item) => {
        if (item.id) {
          return item.id !== action.payload;
        }
        return item !== action.payload;
      });
    },
    clearPostImg: (state) => {
      state.dataPosts.image = [];
    },
    addPostEmotion: (state, action) => {
      state.dataPosts.emotion = action.payload;
    },
    clearPostEmotion: (state) => {
      state.dataPosts.emotion = null;
    },
    unmountTimeline: (state) => {
      state.timeline.posts = [];
    },
    toggleLike: (state, action) => {
      // action payload : id
      const indexPost = state.timeline.posts.findIndex((post) => post.id === action.payload);
      const post = state.timeline.posts[indexPost];
      state.timeline.posts[indexPost] = { ...post, likes: !post.like };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.dataPosts.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.dataPosts.loading = false;
        state.timeline.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.dataPosts.loading = false;
        state.dataPosts.error = action.error.message;
      })
      .addCase(getTimeline.pending, (state) => {
        state.timeline.loading = true;
      })
      .addCase(getTimeline.fulfilled, (state, action) => {
        if (action.payload.length === 0) {
          state.timeline.hasMore = false;
        } else {
          state.timeline.hasMore = true;
        }
        state.timeline.posts = [...state.timeline.posts, ...action.payload].sort((a, b) => {
          return b.created_at.localeCompare(a.created_at);
        });
        state.timeline.error = false;
      })
      .addCase(getTimeline.rejected, (state, action) => {
        state.timeline.error = action.error.message;
        state.timeline.loading = false;
      })
      .addCase(editPost.pending, (state) => {
        state.dataPosts.loading = true;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const indexPostExit = state.timeline.posts.findIndex((post) => post.id === action.payload.id);
        state.timeline.posts[indexPostExit] = {
          ...state.timeline.posts[indexPostExit],
          image: action.payload.image,
          description: action.payload.description,
          emoji: action.payload.emoji,
        };
        state.dataPosts.loading = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const indexPostExit = state.timeline.posts.findIndex((post) => post.id === action.payload);
        state.timeline.posts.splice(indexPostExit, 1);
      });
  },
});

export const {
  addPostEmotion,
  clearPostEmotion,
  addPostImg,
  addPostFullImg,
  clearPostImg,
  removePostImg,
  changePostText,
  unmountTimeline,
} = postsSlice.actions;
export const postsSelector = (state) => state.posts;
export default postsSlice.reducer;

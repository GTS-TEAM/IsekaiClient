import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';
import { ImgUploadType, User } from 'share/types';
import { Emotion, PostType } from './../share/types';
import { RootState } from './../store';

export const uploadImg = async (files: ImgUploadType[]) => {
  const formData = new FormData();
  files.forEach((item) => {
    formData.append('files', item.file);
  });
  const { data } = await isekaiApi.uploadImg(formData);
  return data.urls;
};

interface ParameterCreatePost {
  image: ImgUploadType[];
  description: string;
  emoji: any;
  callback: () => any;
}

export const createPost = createAsyncThunk('posts/createPost', async (d: ParameterCreatePost) => {
  const urls = await uploadImg(d.image);
  const { data } = await isekaiApi.createPost(urls, d.description, d.emoji);
  d.callback(); // implement when create post completed
  return data;
});

interface ParameterEditPost {
  postId: string;
  image: any;
  description: string;
  emoji: any;
  callback: () => any;
}

export const editPost = createAsyncThunk('posts/editPost', async (d: ParameterEditPost) => {
  let urls: string[] | null = null;
  const haveId = d.image.some((item: any) => item.id);
  if (haveId) {
    const tempImg: string[] = [];
    urls = await uploadImg(d.image);
    for (const item of d.image) {
      if (!item.hasOwnProperty('id')) {
        tempImg.push(item);
      }
    }
    urls = [...tempImg, ...urls];
  }
  const { data } = await isekaiApi.editPost(d.postId, urls ? urls : d.image, d.description, d.emoji);
  d.callback(); // implement when edit post completed
  return data;
});

export const likePost = createAsyncThunk<{ postId: string; user: User | null }, string, { state: RootState }>(
  'posts/likePost',
  async (postId: string, thunkApi) => {
    const { user } = thunkApi.getState().auth;
    thunkApi.dispatch(
      toggleLike({
        postId,
        user,
      }),
    );
    await isekaiApi.likePost(postId);
    return {
      postId,
      user,
    };
  },
);

export const deletePost = createAsyncThunk('posts/deletePost', async (postId: string) => {
  await isekaiApi.deletePost(postId);
  return postId;
});

export const getTimeline = createAsyncThunk('posts/getTimeline', async (page: number) => {
  const { data } = await isekaiApi.getTimeline(page);
  return data;
});

export const getUserPosts = createAsyncThunk('posts/gerUserPosts', async (d: { userId: string; page: number }) => {
  const { data } = await isekaiApi.getUserPosts(d.userId, d.page);
  return data;
});

interface InitialState {
  timeline: {
    posts: PostType[];
    isOpenComment: boolean;
    loading: boolean;
    error: null | string | undefined;
    hasMore: boolean;
  };
  dataPosts: {
    loading: boolean;
    error: null | string | undefined;
    postText: string;
    emotion: Emotion | null;
    image: any;
  };
}

const initialState: InitialState = {
  timeline: {
    posts: [],
    isOpenComment: false,
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
    changePostText: (state, action: PayloadAction<string>) => {
      state.dataPosts.postText = action.payload;
    },
    addPostImg: (state, action) => {
      state.dataPosts.image.push(action.payload);
    },
    addPostFullImg: (state, action) => {
      state.dataPosts.image = action.payload;
    },
    removePostImg: (state, action) => {
      state.dataPosts.image = state.dataPosts.image.filter((item: any) => {
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
    toggleLike: (state, action: PayloadAction<{ postId: string; user: User | null }>) => {
      // action payload : id post
      const indexPost = state.timeline.posts.findIndex((item) => item.id === action.payload.postId);
      const indexUserLikedPost = state.timeline.posts[indexPost].likes.findIndex(
        (like) => like.id === action.payload.user?.id,
      );
      if (state.timeline.posts[indexPost].likes[indexUserLikedPost]) {
        state.timeline.posts[indexPost].likes.splice(indexUserLikedPost, 1);
      } else {
        if (action.payload.user) {
          state.timeline.posts[indexPost].likes.unshift(action.payload.user);
        }
      }
      state.timeline.posts[indexPost] = {
        ...state.timeline.posts[indexPost],
        liked: !state.timeline.posts[indexPost].liked,
      };

      if (state.timeline.posts[indexPost].liked) {
        state.timeline.posts[indexPost] = {
          ...state.timeline.posts[indexPost],
          likeCount: state.timeline.posts[indexPost].likeCount + 1,
        };
      } else {
        state.timeline.posts[indexPost] = {
          ...state.timeline.posts[indexPost],
          likeCount: state.timeline.posts[indexPost].likeCount - 1,
        };
      }
    },
    increaseCmt: (state, action: PayloadAction<string>) => {
      const indexPost = state.timeline.posts.findIndex((item) => item.id === action.payload);
      state.timeline.posts[indexPost] = {
        ...state.timeline.posts[indexPost],
        commentCount: state.timeline.posts[indexPost].commentCount + 1,
      };
    },

    decreaseCmt: (state, action: PayloadAction<string>) => {
      const indexPost = state.timeline.posts.findIndex((item) => item.id === action.payload);
      state.timeline.posts[indexPost] = {
        ...state.timeline.posts[indexPost],
        commentCount: state.timeline.posts[indexPost].commentCount - 1,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.dataPosts.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<PostType>) => {
        state.dataPosts.loading = false;
        state.timeline.posts.unshift({
          ...action.payload,
          likes: [],
        });
      })
      .addCase(createPost.rejected, (state, action) => {
        state.dataPosts.loading = false;
        state.dataPosts.error = action.error.message;
      })
      .addCase(getTimeline.pending, (state) => {
        state.timeline.loading = true;
      })
      .addCase(getTimeline.fulfilled, (state, action: PayloadAction<PostType[]>) => {
        if (action.payload.length === 0) {
          state.timeline.hasMore = false;
        } else {
          state.timeline.hasMore = true;
        }
        state.timeline.posts = [...state.timeline.posts, ...action.payload].sort((a, b) => {
          return b.created_at.localeCompare(a.created_at);
        });
        state.timeline.error = null;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.timeline.loading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action: PayloadAction<PostType[]>) => {
        if (action.payload.length === 0) {
          state.timeline.hasMore = false;
        } else {
          state.timeline.hasMore = true;
        }
        state.timeline.posts = [...state.timeline.posts, ...action.payload].sort((a, b) => {
          return b.created_at.localeCompare(a.created_at);
        });
        state.timeline.error = null;
        state.timeline.loading = false;
      })
      .addCase(getTimeline.rejected, (state, action) => {
        state.timeline.error = action.error.message;
        state.timeline.loading = false;
      })
      .addCase(editPost.pending, (state) => {
        state.dataPosts.loading = true;
      })
      .addCase(
        editPost.fulfilled,
        (
          state,
          action: PayloadAction<{
            id: string;
            description: string;
            emoji: number | null;
            created_at: string;
            updated_at: string;
            image: string[];
          }>,
        ) => {
          const indexPostExit = state.timeline.posts.findIndex((post) => post.id === action.payload.id);
          state.timeline.posts[indexPostExit] = {
            ...state.timeline.posts[indexPostExit],
            image: action.payload.image,
            description: action.payload.description,
            emoji: action.payload.emoji,
          };
          state.dataPosts.loading = false;
        },
      )
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        const indexPostExit = state.timeline.posts.findIndex((post) => post.id === action.payload);
        state.timeline.posts.splice(indexPostExit, 1);
      })
      .addCase(likePost.fulfilled, (state, action) => {});
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
  decreaseCmt,
  increaseCmt,
  toggleLike,
} = postsSlice.actions;
export const postsSelector = (state: RootState) => state.posts;
export default postsSlice.reducer;

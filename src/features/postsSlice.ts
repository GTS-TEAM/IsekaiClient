import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { isekaiApi } from 'api/isekaiApi';
import { User } from 'share/types';
import { PostItem } from './../share/types';
import { RootState } from './../store';

export const uploadImg = async (files: { id?: string; url: string; file?: File }[]) => {
  const formData = new FormData();
  files.forEach((item) => {
    formData.append('files', item.file as File);
  });
  const { data } = await isekaiApi.uploadImg(formData);
  return data.urls;
};

interface ParameterCreatePost {
  image: {
    id?: string;
    url: string;
    file?: File;
  }[];
  description: string;
  emoji: any;
}

export const createPost = createAsyncThunk('posts/createPost', async (d: ParameterCreatePost) => {
  let urls: string[] = [];
  if (d.image.length > 0) {
    urls = await uploadImg(d.image);
  }
  const { data } = await isekaiApi.createPost(urls as string[], d.description, d.emoji);
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
        tempImg.push(item.url);
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

export const getSinglePost = createAsyncThunk('post/getSinglePost', async (id: string) => {
  const { data } = await isekaiApi.getPost(id);
  return data;
});
interface InitialState {
  timeline: {
    posts: PostItem[];
    isOpenComment: boolean;
    loading: boolean;
    error: null | string | undefined;
    hasMore: boolean;
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
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
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
    unmountTimeline: (state) => {
      state.timeline.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {})
      .addCase(createPost.fulfilled, (state, action: PayloadAction<PostItem>) => {
        state.timeline.posts.unshift({
          ...action.payload,
          likes: [],
        });
      })
      .addCase(getTimeline.pending, (state) => {
        state.timeline.loading = true;
      })
      .addCase(getTimeline.fulfilled, (state, action: PayloadAction<PostItem[]>) => {
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
      .addCase(getUserPosts.fulfilled, (state, action: PayloadAction<PostItem[]>) => {
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
        },
      )
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        const indexPostExit = state.timeline.posts.findIndex((post) => post.id === action.payload);
        state.timeline.posts.splice(indexPostExit, 1);
      })
      .addCase(likePost.fulfilled, (state, action) => {})
      .addCase(getSinglePost.pending, (state) => {
        state.timeline.loading = true;
      })
      .addCase(getSinglePost.fulfilled, (state, action: PayloadAction<PostItem>) => {
        state.timeline.posts.push(action.payload);
        state.timeline.loading = false;
      });
  },
});

export const { unmountTimeline, decreaseCmt, increaseCmt, toggleLike } = postsSlice.actions;
export const postsSelector = (state: RootState) => state.posts;
export default postsSlice.reducer;

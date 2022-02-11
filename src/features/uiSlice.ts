import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

interface InitialState {
  modalPost: {
    isOpenEdit: boolean;
    isOpenPost: boolean;
    isOpenViewPost: boolean;
    idPost: null | string;
    idPostEdit: null | string;
    haveChoosePhoto: boolean;
    haveChooseEmotion: boolean;
  };
}

const initialState: InitialState = {
  modalPost: {
    isOpenEdit: false,
    isOpenPost: false,
    isOpenViewPost: false,
    idPostEdit: null,
    haveChoosePhoto: false,
    haveChooseEmotion: false,
    idPost: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCreatePostModal: (state) => {
      state.modalPost.isOpenPost = true;
    },
    closeCreatePostModal: (state) => {
      state.modalPost.isOpenPost = false;
      state.modalPost.haveChoosePhoto = false;
      state.modalPost.haveChooseEmotion = false;
    },
    openEditPostModal: (state, action: PayloadAction<string>) => {
      if (state.modalPost.idPostEdit === action.payload) {
        state.modalPost.isOpenEdit = true;
      }
    },
    setPostIdEdit: (state, action: PayloadAction<string>) => {
      state.modalPost.idPostEdit = action.payload;
    },
    closeEditPostModal: (state) => {
      state.modalPost.isOpenEdit = false;
      state.modalPost.haveChoosePhoto = false;
      state.modalPost.haveChooseEmotion = false;
      state.modalPost.idPostEdit = null;
    },
    openViewPost: (state) => {
      state.modalPost.isOpenViewPost = true;
    },
    closeViewPost: (state) => {
      state.modalPost.isOpenViewPost = false;
    },
    setPostIdView: (state, action: PayloadAction<string>) => {
      state.modalPost.idPost = action.payload;
    },
    toggleHaveChoosePhoto: (state) => {
      state.modalPost.haveChoosePhoto = !state.modalPost.haveChoosePhoto;
    },
    toggleHaveChooseEmotion: (state) => {
      state.modalPost.haveChooseEmotion = !state.modalPost.haveChooseEmotion;
    },
  },
});

export const {
  setPostIdEdit,
  openCreatePostModal,
  closeCreatePostModal,
  openEditPostModal,
  closeEditPostModal,
  toggleHaveChooseEmotion,
  toggleHaveChoosePhoto,
  closeViewPost,
  openViewPost,
  setPostIdView,
} = uiSlice.actions;
export const uiSelector = (state: RootState) => state.ui;
export default uiSlice.reducer;

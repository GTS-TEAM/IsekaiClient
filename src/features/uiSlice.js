import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  createPostModal: {
    isOpenEdit: false,
    isOpenPost: false,
    idPostEdit: null,
    haveChoosePhoto: false,
    haveChooseEmotion: false,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openCreatePostModal: (state) => {
      state.createPostModal.isOpenPost = true;
    },
    closeCreatePostModal: (state) => {
      state.createPostModal.isOpenPost = false;
      state.createPostModal.haveChoosePhoto = false;
      state.createPostModal.haveChooseEmotion = false;
    },
    openEditPostModal: (state, action) => {
      if (state.createPostModal.idPostEdit === action.payload) {
        state.createPostModal.isOpenEdit = true;
      }
    },
    setPostIdEdit: (state, action) => {
      state.createPostModal.idPostEdit = action.payload;
    },
    closeEditPostModal: (state) => {
      state.createPostModal.isOpenEdit = false;
      state.createPostModal.haveChoosePhoto = false;
      state.createPostModal.haveChooseEmotion = false;
      state.createPostModal.idPostEdit = null;
    },
    toggleHaveChoosePhoto: (state) => {
      state.createPostModal.haveChoosePhoto = !state.createPostModal.haveChoosePhoto;
    },
    toggleHaveChooseEmotion: (state) => {
      state.createPostModal.haveChooseEmotion = !state.createPostModal.haveChooseEmotion;
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
} = uiSlice.actions;
export const uiSelector = (state) => state.ui;
export default uiSlice.reducer;

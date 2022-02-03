import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changePostText, clearPostEmotion, clearPostImg } from 'features/postsSlice';
import {
  closeCreatePostModal,
  openCreatePostModal,
  toggleHaveChooseEmotion,
  toggleHaveChoosePhoto,
  uiSelector,
} from 'features/uiSlice';
import { authSelector } from 'features/authSlice';
import { useOverFlowHidden } from 'hooks/useOverFlowHidden';
import { Avatar, Stack } from '@mui/material';
import { IMG } from 'images';
import { ModalCreatePost, Overlay } from 'components';
import { Action, Bottom, Header, InputDummy, StyledCreatePost } from './Styles';

const CreatePost = () => {
  const { user } = useSelector(authSelector);
  const ui = useSelector(uiSelector);
  const dispatch = useDispatch();

  const openModalCreatePostHandler = () => {
    dispatch(openCreatePostModal('post'));
  };

  const closeModalCreatePostHandler = () => {
    console.log('close');
    dispatch(closeCreatePostModal('post'));
    dispatch(clearPostEmotion());
    dispatch(clearPostImg());
    dispatch(changePostText(''));
  };

  useOverFlowHidden(ui.createPostModal.isOpenPost);

  return (
    <StyledCreatePost>
      <Header>
        <Stack direction="row" alignItems="center" columnGap="1.6rem">
          <Avatar src={user.profilePicture} />
          <InputDummy onClick={openModalCreatePostHandler}>
            <p>{user?.username} ơi, bạn đang nghĩ gì thế?</p>
          </InputDummy>
        </Stack>
      </Header>
      <Bottom>
        <Stack direction="row" alignItems="center" columnGap="1.6rem">
          <Action
            onClick={() => {
              dispatch(toggleHaveChoosePhoto());
              openModalCreatePostHandler();
            }}
          >
            <IMG.AddPhoto fill="#00a400" />
            <span>Ảnh</span>
          </Action>
          <Action
            onClick={() => {
              dispatch(toggleHaveChooseEmotion());
              openModalCreatePostHandler();
            }}
          >
            <IMG.Emotion fill="#f5c33b" />
            <span>Tâm trạng/Cảm xúc</span>
          </Action>
        </Stack>
      </Bottom>

      {ui.createPostModal.isOpenPost && <Overlay onClose={closeModalCreatePostHandler} />}
      {ui.createPostModal.isOpenPost && (
        <ModalCreatePost type="post" onCloseModal={closeModalCreatePostHandler} open={ui.createPostModal.isOpenPost} />
      )}
    </StyledCreatePost>
  );
};

export default CreatePost;

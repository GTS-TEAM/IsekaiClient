import { Avatar, Stack } from '@mui/material';
import ModalPost from 'components/ModalPost/ModalPost';
import Overlay from 'components/Overlay/Overlay';
import { useAppDispatch } from 'hooks/hooks';
import React from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../features/authSlice';
import { changePostText, clearPostEmotion, clearPostImg } from '../../features/postsSlice';
import {
  closeCreatePostModal,
  openCreatePostModal,
  toggleHaveChooseEmotion,
  toggleHaveChoosePhoto,
  uiSelector,
} from '../../features/uiSlice';
import { useOverFlowHidden } from '../../hooks/useOverFlowHidden';
import { IMG } from '../../images';
import { Action, Bottom, Header, InputDummy, StyledCreatePost } from './Styles';

const CreatePost = () => {
  const { user } = useSelector(authSelector);
  const { modalPost: uiModalPost } = useSelector(uiSelector);
  const dispatch = useAppDispatch();

  const openModalCreatePostHandler = () => {
    dispatch(openCreatePostModal());
  };

  const closeModalCreatePostHandler = () => {
    dispatch(closeCreatePostModal());
    dispatch(clearPostEmotion());
    dispatch(clearPostImg());
    dispatch(changePostText(''));
  };

  useOverFlowHidden(uiModalPost.isOpenPost);

  return (
    <StyledCreatePost>
      <Header>
        <Stack direction="row" alignItems="center" columnGap="1.6rem">
          <Avatar src={user?.avatar} alt="" />
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

      {uiModalPost.isOpenPost && <Overlay onClose={closeModalCreatePostHandler} />}
      {uiModalPost.isOpenPost && <ModalPost type="post" onCloseModal={closeModalCreatePostHandler} />}
    </StyledCreatePost>
  );
};

export default CreatePost;

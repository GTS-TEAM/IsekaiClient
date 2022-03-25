import { Avatar, Stack } from '@mui/material';
import ModalPost from 'components/ModalPost';
import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { authSelector } from '../../features/authSlice';
import { useOverFlowHidden } from '../../hooks/useOverFlowHidden';
import { IMG } from '../../images';
import { Action, Bottom, Header, InputDummy, StyledCreatePost } from './Styles';

const CreatePost = () => {
  const { user } = useSelector(authSelector);
  const [haveChooseImg, setHaveChooseImg] = useState<boolean>(false);
  const [haveChooseEmoji, setHaveChooseEmoji] = useState<boolean>(false);
  const [isOpenModalAddPost, setIsOpenModalAddPost] = useState<boolean>(false);

  const closeModalHandler = useCallback(() => {
    setIsOpenModalAddPost(false);
    setHaveChooseEmoji(false);
    setHaveChooseImg(false);
  }, []);

  useOverFlowHidden(isOpenModalAddPost);

  return (
    <StyledCreatePost>
      <Header>
        <Stack direction="row" alignItems="center" columnGap="1.6rem">
          <Avatar src={user?.avatar} alt="" />
          <InputDummy
            onClick={() => {
              setIsOpenModalAddPost(true);
            }}
          >
            <p>{user?.username} ơi, bạn đang nghĩ gì thế?</p>
          </InputDummy>
        </Stack>
      </Header>
      <Bottom>
        <Stack direction="row" alignItems="center" columnGap="1.6rem">
          <Action
            onClick={() => {
              setHaveChooseImg(true);
              setIsOpenModalAddPost(true);
            }}
          >
            <IMG.AddPhoto fill="#00a400" />
            <span>Ảnh</span>
          </Action>
          <Action
            onClick={() => {
              setHaveChooseEmoji(true);
              setIsOpenModalAddPost(true);
            }}
          >
            <IMG.Emotion fill="#f5c33b" />
            <span>Tâm trạng/Cảm xúc</span>
          </Action>
        </Stack>
      </Bottom>

      {isOpenModalAddPost && (
        <ModalPost
          type="post"
          onCloseModal={closeModalHandler}
          haveChooseEmoji={haveChooseEmoji}
          haveChooseImg={haveChooseImg}
          setHaveChooseEmoji={setHaveChooseEmoji}
          setHaveChooseImg={setHaveChooseImg}
        />
      )}
    </StyledCreatePost>
  );
};

export default CreatePost;

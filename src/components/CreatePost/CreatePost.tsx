import { Avatar, Button, Stack } from '@mui/material';
import ModalPost from 'components/ModalPost';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { authSelector } from '../../features/authSlice';
import { useOverFlowHidden } from '../../hooks/useOverFlowHidden';
import { Actions, Header, InputDummy, StyledCreatePost } from './Styles';

const CreatePost = () => {
  const { user } = useSelector(authSelector);
  const [haveChooseImg, setHaveChooseImg] = useState<boolean>(false);
  const [haveChooseEmoji, setHaveChooseEmoji] = useState<boolean>(false);
  const [isOpenModalAddPost, setIsOpenModalAddPost] = useState<boolean>(false);
  const [imgs, setImgs] = useState<
    {
      id?: string;
      url: string;
      file?: File;
    }[]
  >([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onImageChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setImgs((imgs) => [
        ...imgs,
        {
          file: files[0],
          id: v4(),
          url,
        },
      ]);
    }
  };

  const closeModalHandler = useCallback(() => {
    setIsOpenModalAddPost(false);
    setHaveChooseEmoji(false);
    setHaveChooseImg(false);
    setImgs([]);
  }, []);

  useOverFlowHidden(isOpenModalAddPost);

  useEffect(() => {
    if (imgs.length > 0) {
      setIsOpenModalAddPost(true);
    }
  }, [imgs]);

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
      <Actions>
        <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={onImageChange} />
        <Button
          onClick={() => {
            inputRef.current?.click();
          }}
        >
          <AiOutlineCamera />
          <span>Hình ảnh</span>
        </Button>
        <Button
          onClick={() => {
            setHaveChooseEmoji(!haveChooseEmoji);
          }}
        >
          <BsEmojiSunglasses />
          <span>Trạng thái</span>
        </Button>
      </Actions>

      {isOpenModalAddPost && (
        <ModalPost
          type="post"
          onCloseModal={closeModalHandler}
          haveChooseEmoji={haveChooseEmoji}
          haveChooseImg={haveChooseImg}
          setHaveChooseEmoji={setHaveChooseEmoji}
          setHaveChooseImg={setHaveChooseImg}
          imgsPost={imgs}
        />
      )}
    </StyledCreatePost>
  );
};

export default CreatePost;

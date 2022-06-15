import { Alert, Avatar, Button, IconButton, Snackbar, Stack, TextareaAutosize } from '@mui/material';
import { Box } from '@mui/system';
import Status from 'components/Emotion';
import ModalWrapper from 'components/Modal/ModalWrapper';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import { BsEmojiSunglasses } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { EmotionItem } from 'share/types';
import { v4 } from 'uuid';
import { authSelector } from '../../features/authSlice';
import { createPost, editPost } from '../../features/postsSlice';
import { Actions, ListImgPreview, StyledBody, StyledChooseStatus } from './Styles';

interface Props {
  type: 'post' | 'edit';
  postId?: string;
  onCloseModal: () => any;
  contentPost?: string;
  imgsPost?: {
    id?: string;
    url: string;
    file?: File;
  }[];
  haveChooseImg: boolean;
  haveChooseEmoji: boolean;
  setHaveChooseImg: (value: boolean) => any;
  setHaveChooseEmoji: (value: boolean) => any;
}

const ModalPost: React.FC<Props> = ({
  type,
  postId,
  onCloseModal,
  contentPost,
  imgsPost,
  haveChooseEmoji,
  haveChooseImg,
  setHaveChooseEmoji,
  setHaveChooseImg,
}) => {
  const { user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<EmotionItem | null>(null);
  const [textInput, setTextInput] = useState<string>(contentPost || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [imgs, setImgs] = useState<
    {
      id?: string;
      url: string;
      file?: File;
    }[]
  >(imgsPost || []);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [openToast, setOpenToast] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(true);

  const allowBtn = useMemo(
    () => textInput.trim().length === 0 && imgs.length === 0 && status === null,
    [textInput, imgs, status],
  );

  const onImageChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      setImgs((imgs) => [
        ...imgs,
        {
          id: v4(),
          file: files[0],
          url,
        },
      ]);
    }
  };

  const removeImgHandler = (id: string) => () => {
    setImgs((imgs: any) => {
      return [...imgs].filter((img) => {
        if (img.id) {
          return img.id !== id;
        }
        return img !== id;
      });
    });
  };

  const editPostHandler = async () => {
    setLoading(true);
    await dispatch(
      editPost({
        description: textInput,
        image: imgs,
        emoji: status?.id as number,
        postId: postId as string,
        callback: () => {
          onCloseModal();
        },
      }),
    );
    setLoading(false);
  };

  const createPostHandler = async () => {
    setLoading(true);
    const action = await dispatch(
      createPost({
        description: textInput,
        image: imgs,
        emoji: status?.id,
      }),
    );
    setOpenToast(true);

    if (createPost.fulfilled.match(action)) {
      setLoading(false);
      setIsSuccess(true);
      onCloseModal();
    }

    if (createPost.rejected.match(action)) {
      setLoading(false);
      setIsSuccess(false);
      onCloseModal();
    }
  };

  const closeHandler = useCallback(() => {
    setStatus(null);
    setImgs([]);
    setTextInput('');
    onCloseModal();
  }, [onCloseModal]);

  useEffect(() => {
    return () => {
      closeHandler();
    };
  }, [closeHandler]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={openToast}
        autoHideDuration={3000}
        onClose={() => {
          setOpenToast(false);
        }}
      >
        <Alert
          onClose={() => {
            setOpenToast(false);
          }}
          severity={isSuccess ? 'success' : 'error'}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {isSuccess ? 'Thêm bài viết thành công' : 'Đã có lỗi khi thêm bài viết'}
        </Alert>
      </Snackbar>
      <ModalWrapper
        titleHeader="Tạo bài viết"
        textCancel="Hủy"
        textOk={loading ? 'Loading...' : type === 'edit' ? 'Chỉnh sửa' : 'Thêm bài viết'}
        onOk={() => {
          type === 'post' ? createPostHandler() : editPostHandler();
        }}
        hiddenButtonCancel={true}
        onClose={onCloseModal}
        propsButtonOk={{
          disabled: allowBtn,
        }}
      >
        <StyledBody>
          <Stack direction="row" gap={'1.2rem'}>
            <Avatar src={user?.avatar as string} alt={user?.username as string} />
            <Box
              sx={{
                width: '100%',
              }}
            >
              <TextareaAutosize
                maxRows={4}
                minRows={4}
                style={{
                  width: '100%',
                  resize: 'none',
                  fontSize: '1.4rem',
                  minHeight: '12rem',
                  maxHeight: '12rem',
                }}
                placeholder={`${user?.username} ơi. Bạn đang nghĩ gì thế!`}
                onChange={(e) => {
                  setTextInput(e.target.value);
                }}
              />
            </Box>
          </Stack>
          {imgs.length !== 0 && (
            <ListImgPreview>
              {imgs.map((img: any) => (
                <li key={img.id || img.url}>
                  <div className="outer">
                    <IconButton onClick={removeImgHandler(img.id || img)}>
                      <IoClose />
                    </IconButton>
                    <div className="inner">
                      <img src={img.url || img} alt="" />
                    </div>
                  </div>
                </li>
              ))}
            </ListImgPreview>
          )}
          {status && (
            <StyledChooseStatus>
              <img src={status.icon} alt="" />
              <span>{status.name}</span>
              <IconButton
                onClick={() => {
                  setStatus(null);
                }}
              >
                <IoClose />
              </IconButton>
            </StyledChooseStatus>
          )}
          {haveChooseEmoji && <Status status={status} setStatus={setStatus} setHaveChooseEmoji={setHaveChooseEmoji} />}
        </StyledBody>
        <Actions>
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
        <input type="file" accept="image/*" style={{ display: 'none' }} ref={inputRef} onChange={onImageChange} />
      </ModalWrapper>
    </>
  );
};

export default React.memo(ModalPost);

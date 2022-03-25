import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { Button, ClickAwayListener, Stack } from '@mui/material';
import autosize from 'autosize';
import Status from 'components/Emotion';
import ModalWrapper from 'components/Modal';
import { Header } from 'components/Modal/Styles';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { IMG } from 'images';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import { EmotionItem } from 'share/types';
import { REGEX_URL } from 'utils/constant';
import { v4 } from 'uuid';
import { authSelector } from '../../features/authSlice';
import { createPost, editPost } from '../../features/postsSlice';
import {
  Actions,
  Body,
  Bottom,
  Close,
  ImgPreview,
  ImgPreviewList,
  InputArea,
  InputPhoto,
  StyledModal,
  StyledUserBlockPost,
} from './Styles';

interface Props {
  className?: string;
  style?: React.CSSProperties;
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
  className,
  style,
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
    await dispatch(
      createPost({
        description: textInput,
        image: imgs,
        emoji: status?.id,
        callback: () => {
          onCloseModal();
        },
      }),
    );
    setLoading(false);
  };

  useEffect(() => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      autosize(textarea);
    }
  }, []);

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
    <ModalWrapper>
      <ClickAwayListener onClickAway={closeHandler}>
        <StyledModal className={className} style={style}>
          <Header>
            <h3>Tạo bài viết</h3>
            <Button onClick={closeHandler}>
              <IoClose />
            </Button>
          </Header>
          <Body>
            <StyledUserBlockPost
              userImg={user?.avatar || ''}
              userId={user?.id || ''}
              userName={user?.username || ''}
              emoji={status?.id as number}
            />
            <InputArea
              name="postValue"
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
              placeholder={`${user?.username} ơi, bạn đang nghĩ gì thế?`}
              value={textInput}
            />
            {REGEX_URL.test(textInput) && <LinkPreview url={textInput.match(REGEX_URL)?.[0]} />}
            {imgs.length !== 0 && (
              <ImgPreviewList sx={{ '--col': `${imgs.length > 2 ? 2 : imgs.length}` }}>
                {imgs.map((img: any) => {
                  return (
                    <ImgPreview key={img.id || img.url}>
                      <img src={img.url || img} alt="" />
                      <Close onClick={removeImgHandler(img.id || img)}>
                        <IoClose />
                      </Close>
                    </ImgPreview>
                  );
                })}
              </ImgPreviewList>
            )}

            {haveChooseImg && (
              <InputPhoto>
                <input type="file" accept="image/*" onChange={onImageChange} />
                <Close
                  onClick={() => {
                    setHaveChooseImg(false);
                  }}
                >
                  <IoClose />
                </Close>
                <Stack justifyContent="center" alignItems="center" rowGap="1.6rem">
                  <RiImageAddFill />
                  <span>Thêm ảnh hoặc kéo và thả</span>
                </Stack>
              </InputPhoto>
            )}
          </Body>
          {haveChooseEmoji && <Status status={status} setStatus={setStatus} setHaveChooseEmoji={setHaveChooseEmoji} />}
          <Bottom>
            <h3>Thêm vào bài viết</h3>
            <Actions>
              <div
                className="add-photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setHaveChooseImg(!haveChooseImg);
                }}
              >
                <IMG.AddPhoto style={{ fill: '#00a400' }} />
              </div>
              <div
                className="add-emotion"
                onClick={(e) => {
                  e.stopPropagation();
                  setHaveChooseEmoji(!haveChooseEmoji);
                }}
              >
                <IMG.Emotion style={{ fill: '#f5c33b' }} />
              </div>
              {type === 'edit' && (
                <button onClick={editPostHandler} disabled={allowBtn}>
                  Edit
                </button>
              )}
              {type === 'post' && (
                <button onClick={createPostHandler} disabled={allowBtn}>
                  Post
                </button>
              )}
            </Actions>
          </Bottom>
        </StyledModal>
      </ClickAwayListener>
      {loading ? <p>Loading</p> : null}
    </ModalWrapper>
  );
};

export default React.memo(ModalPost);

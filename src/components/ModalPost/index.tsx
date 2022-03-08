import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { CircularProgress, Stack } from '@mui/material';
import autosize from 'autosize';
import Emotion from 'components/Emotion/Emotion';
import UserBlockPost from 'components/UserBlockPost/UserBlockPost';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { IMG } from 'images';
import React, { useEffect, useMemo, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import { REGEX_URL } from 'utils/constant';
import { v4 as uuidv4 } from 'uuid';
import { authSelector } from '../../features/authSlice';
import {
  addPostImg,
  changePostText,
  clearPostEmotion,
  createPost,
  editPost,
  postsSelector,
  removePostImg,
} from '../../features/postsSlice';
import { toggleHaveChooseEmotion, toggleHaveChoosePhoto, uiSelector } from '../../features/uiSlice';
import {
  Actions,
  Body,
  Bottom,
  Close,
  Header,
  ImgPreview,
  ImgPreviewList,
  InputArea,
  InputPhoto,
  Loading,
  Overlay,
  StyledModalPost,
  TextBottom,
} from './Styles';

interface Props {
  className?: string;
  style?: React.CSSProperties;
  type: string;
  postId?: string;
  onCloseModal: () => any;
}

const ModalPost: React.FC<Props> = ({ className, style, type, postId, onCloseModal }) => {
  const [disabledBtn, setDisabledBtn] = useState<boolean>(true);
  const { user } = useAppSelector(authSelector);
  const { modalPost: uiModalPost } = useAppSelector(uiSelector);
  const posts = useAppSelector(postsSelector);
  const dispatch = useAppDispatch();

  const allowBtn = useMemo(
    () =>
      posts.dataPosts.postText.trim().length === 0 && posts.dataPosts.image.length === 0 && posts.dataPosts.emotion === null,
    [posts.dataPosts.postText, posts.dataPosts.image, posts.dataPosts.emotion],
  );

  const onImageChange = async (e: React.FormEvent<HTMLInputElement>) => {
    const { files } = e.currentTarget;
    if (files && files[0]) {
      const url = URL.createObjectURL(files[0]);
      dispatch(
        addPostImg({
          id: uuidv4(),
          url,
          file: files[0],
        }),
      );
    }
  };

  const removeImgHandler = (id: string) => () => {
    dispatch(removePostImg(id));
  };

  const postTextChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    dispatch(changePostText(e.currentTarget.value));
  };

  useEffect(() => {
    if (allowBtn) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [allowBtn]);

  const editPostHandler = () => {
    dispatch(
      editPost({
        description: posts.dataPosts.postText,
        image: posts.dataPosts.image,
        emoji: posts.dataPosts.emotion?.id,
        postId: postId || '',
        callback: () => {
          onCloseModal();
        },
      }),
    );
  };

  const createPostHandler = async () => {
    if (allowBtn) {
      setDisabledBtn(true);
      return;
    }
    setDisabledBtn(false);

    dispatch(
      createPost({
        description: posts.dataPosts.postText,
        image: posts.dataPosts.image,
        emoji: posts.dataPosts.emotion?.id,
        callback: () => {
          onCloseModal();
        },
      }),
    );
  };

  useEffect(() => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (textarea) {
      autosize(textarea);
    }
  }, []);

  const closeEmotionHandler = () => {
    dispatch(toggleHaveChooseEmotion());
    dispatch(clearPostEmotion());
  };

  return (
    <StyledModalPost className={className} style={style}>
      <Header>
        <span>Tạo bài viết</span>
        <Close onClick={onCloseModal}>
          <IoClose />
        </Close>
      </Header>
      <Body>
        <UserBlockPost
          userImg={user?.avatar || ''}
          userId={user?.id || ''}
          userName={user?.username || ''}
          emoji={posts.dataPosts.emotion?.id}
        />
        <InputArea>
          <textarea
            name="postValue"
            onChange={postTextChangeHandler}
            placeholder={`${user?.username} ơi, bạn đang nghĩ gì thế?`}
            value={posts.dataPosts.postText}
          ></textarea>
        </InputArea>
        {REGEX_URL.test(posts.dataPosts.postText) && <LinkPreview url={posts.dataPosts.postText.match(REGEX_URL)?.[0]} />}
        {posts.dataPosts.image.length !== 0 && (
          <ImgPreviewList sx={{ '--col': `${posts.dataPosts.image.length > 2 ? 2 : posts.dataPosts.image.length}` }}>
            {posts.dataPosts.image.map((img: any) => {
              return (
                <ImgPreview key={img.id || img}>
                  <img src={img.url || img} alt="" />
                  <Close onClick={removeImgHandler(img.id || img)}>
                    <IoClose />
                  </Close>
                </ImgPreview>
              );
            })}
          </ImgPreviewList>
        )}

        {uiModalPost.haveChoosePhoto && (
          <InputPhoto>
            <input type="file" accept="image/*" onChange={onImageChange} />
            <Close
              onClick={() => {
                dispatch(toggleHaveChoosePhoto());
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
        {uiModalPost.haveChooseEmotion && <Emotion onClose={closeEmotionHandler} />}
      </Body>
      <Bottom>
        <TextBottom>Thêm vào bài viết</TextBottom>
        <Actions>
          <div
            className="add-photo"
            onClick={() => {
              dispatch(toggleHaveChoosePhoto());
            }}
          >
            <IMG.AddPhoto style={{ fill: '#00a400' }} />
          </div>
          <div className="add-emotion" onClick={closeEmotionHandler}>
            <IMG.Emotion style={{ fill: '#f5c33b' }} />
          </div>
          <button
            onClick={type === 'post' ? createPostHandler : editPostHandler}
            disabled={disabledBtn || posts.dataPosts?.loading}
          >
            {type === 'post' ? 'post' : 'edit'}
          </button>
        </Actions>
      </Bottom>

      {posts.dataPosts.loading ? (
        <React.Fragment>
          <Overlay />
          <Loading>
            <CircularProgress size={'3.6rem'} color={'inherit'} />
          </Loading>
        </React.Fragment>
      ) : null}
    </StyledModalPost>
  );
};

export default React.memo(ModalPost);

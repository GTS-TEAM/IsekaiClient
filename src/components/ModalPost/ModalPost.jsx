import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import autosize from 'autosize';
import { v4 as uuidv4 } from 'uuid';
import { IMG } from 'images';
import {
  addPostImg,
  changePostText,
  clearPostEmotion,
  createPost,
  editPost,
  postsSelector,
  removePostImg,
} from 'features/postsSlice';
import { IoClose } from 'react-icons/io5';
import { RiImageAddFill } from 'react-icons/ri';
import { CircularProgress, Stack } from '@mui/material';
import { Emotion, UserBlockPost } from 'components';
import { authSelector } from 'features/authSlice';
import { toggleHaveChooseEmotion, toggleHaveChoosePhoto, uiSelector } from 'features/uiSlice';
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

const ModalPost = ({ className = '', style, type, postId, onCloseModal }) => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const { user } = useSelector(authSelector);
  const ui = useSelector(uiSelector);
  const posts = useSelector(postsSelector);
  const dispatch = useDispatch();

  const allowBtn = useMemo(
    () =>
      posts.dataPosts.postText.trim().length === 0 && posts.dataPosts.image.length === 0 && posts.dataPosts.emotion === null,
    [posts.dataPosts.postText, posts.dataPosts.image, posts.dataPosts.emotion],
  );

  const onImageChange = async (e) => {
    const { files } = e.target;
    const url = URL.createObjectURL(files[0]);
    dispatch(
      addPostImg({
        id: uuidv4(),
        url,
        file: files[0],
      }),
    );
  };

  const removeImgHandler = (id) => () => {
    dispatch(removePostImg(id));
  };

  const postTextChangeHandler = (e) => {
    dispatch(changePostText(e.target.value));
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
        postId,
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
    autosize(document.querySelector('textarea'));
  }, []);

  const closeEmotionHandler = () => {
    dispatch(toggleHaveChooseEmotion());
    dispatch(clearPostEmotion());
  };

  return (
    <StyledModalPost>
      <Header>
        <span>Tạo bài viết</span>
        <Close onClick={onCloseModal}>
          <IoClose />
        </Close>
      </Header>
      <Body>
        <UserBlockPost userImg={user.avatar} userId={user.id} userName={user.username} emoji={posts.dataPosts.emotion?.id} />
        <InputArea>
          <textarea
            name="postValue"
            onChange={postTextChangeHandler}
            placeholder={`${user?.username} ơi, bạn đang nghĩ gì thế?`}
            value={posts.dataPosts.postText}
          ></textarea>
        </InputArea>
        {posts.dataPosts.image.length !== 0 && (
          <ImgPreviewList style={{ '--col': `${posts.dataPosts.image.length > 2 ? 2 : posts.dataPosts.image.length}` }}>
            {posts.dataPosts.image.map((img) => {
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

        {ui.createPostModal.haveChoosePhoto && (
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
        {ui.createPostModal.haveChooseEmotion && <Emotion onClose={closeEmotionHandler} />}
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

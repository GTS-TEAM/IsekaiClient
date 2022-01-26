import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { ModalCreatePost } from '..';
import { Overlay } from '../../../../components';
import {
  closeCreatePostModal,
  openCreatePostModal,
  toggleHaveChooseEmotion,
  toggleHaveChoosePhoto,
  uiSelector,
} from '../../../../features/uiSlice';
import { authSelector } from '../../../../features/authSlice';
import { IMG } from '../../../../images';
import styled from './CreatePost.module.scss';
import { changePostText, clearPostEmotion, clearPostImg } from '../../../../features/postsSlice';
import { useOverFlowHidden } from '../../../../hooks/useOverFlowHidden';
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
    <div className={styled['create-post']}>
      <div className={styled.top}>
        <div className={styled.user__img}>
          <img src={user?.profilePicture} alt="" />
        </div>
        <div className={styled.input__dummy} onClick={openModalCreatePostHandler}>
          <p>{user?.username} ơi, bạn đang nghĩ gì thế?</p>
        </div>
      </div>
      <div className={styled.bottom}>
        <div
          className={styled['add-photo']}
          onClick={() => {
            dispatch(toggleHaveChoosePhoto());
            openModalCreatePostHandler();
          }}
        >
          <IMG.AddPhoto />
          <span>Ảnh</span>
        </div>
        <div
          className={styled['add-emotion']}
          onClick={() => {
            dispatch(toggleHaveChooseEmotion());
            openModalCreatePostHandler();
          }}
        >
          <IMG.Emotion />
          <span>Tâm trạng/Cảm xúc</span>
        </div>
      </div>

      {ui.createPostModal.isOpenPost && <Overlay onClose={closeModalCreatePostHandler} />}
      {ui.createPostModal.isOpenPost && (
        <ModalCreatePost
          style={
            ui.createPostModal.isOpenPost
              ? {
                  top: '50%',
                  opacity: '1',
                  visibility: 'visible',
                  transform: 'translate(-50%, -50%)',
                }
              : null
          }
          type="post"
          onCloseModal={closeModalCreatePostHandler}
        />
      )}
    </div>
  );
};

export default CreatePost;

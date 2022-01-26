import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ModalCreatePost } from '..';
import { Overlay } from '../../../../components';
import { authSelector } from '../../../../features/authSlice';
import { IMG } from '../../../../images';
import styled from './CreatePost.module.scss';
const CreatePost = () => {
  const { user } = useSelector(authSelector);
  const [open, setOpen] = useState(false);
  const [haveChoosePhoto, setHaveChoosePhoto] = useState(false);
  const [haveChooseEmotion, setHaveChooseEmotion] = useState(false);

  const openModalCreatePost = () => {
    setOpen(true);
  };

  const closeModalCreatePost = () => {
    setOpen(false);
  };

  return (
    <div className={styled['create-post']}>
      <div className={styled.top}>
        <div className={styled.user__img}>
          <img src={user?.profilePicture} alt="" />
        </div>
        <div className={styled.input__dummy} onClick={openModalCreatePost}>
          <p>{user?.username} ơi, bạn đang nghĩ gì thế?</p>
        </div>
      </div>
      <div className={styled.bottom}>
        <div
          className={styled['add-photo']}
          onClick={() => {
            setHaveChoosePhoto(true);
            setOpen(true);
          }}
        >
          <IMG.AddPhoto />
          <span>Ảnh</span>
        </div>
        <div
          className={styled['add-emotion']}
          onClick={() => {
            setHaveChooseEmotion(true);
            setOpen(true);
          }}
        >
          <IMG.Emotion />
          <span>Tâm trạng/Cảm xúc</span>
        </div>
      </div>
      <ModalCreatePost
        style={
          open
            ? {
                top: '50%',
                opacity: '1',
                visibility: 'visible',
                transform: 'translate(-50%, -50%)',
              }
            : null
        }
        haveChoosePhoto={haveChoosePhoto}
        haveChooseEmotion={haveChooseEmotion}
        setHaveChooseEmotion={setHaveChooseEmotion}
        setHaveChoosePhoto={setHaveChoosePhoto}
        setOpen={setOpen}
        open={open}
      />
      {open && <Overlay onClose={closeModalCreatePost} />}
    </div>
  );
};

export default CreatePost;

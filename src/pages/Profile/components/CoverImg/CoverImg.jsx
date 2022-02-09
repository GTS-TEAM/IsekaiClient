import { Button } from '@mui/material';
import { IMG } from 'images';
import React, { useRef, useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import Avatar from '../Avatar/Avatar';
import { StyledCoverImg, BgCover, CoverOverLay, InputImgTrigger } from './Styles';
import { authSelector } from '../../../../features/authSlice';
import { Overlay } from 'components';
import Modal from '../Modal/Modal';
const CoverImg = ({ imgBgUrl, userImg, userId }) => {
  const { user: currentUser } = useSelector(authSelector);
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  return (
    <StyledCoverImg>
      <BgCover src={imgBgUrl || IMG.BgImgCoverProfile} />
      <CoverOverLay />
      <Avatar userImg={userImg} userId={userId} />
      {currentUser.id === userId && (
        <InputImgTrigger>
          <Button onClick={openModalHandler}>
            <AiFillCamera />
            <span>Thêm ảnh bìa</span>
          </Button>
        </InputImgTrigger>
      )}
      {openModal && <Modal onClose={closeModalHandler} field="background" />}
      {openModal && <Overlay onClose={closeModalHandler} />}
    </StyledCoverImg>
  );
};

export default CoverImg;

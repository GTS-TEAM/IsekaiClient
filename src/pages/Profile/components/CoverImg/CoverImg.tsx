import { Button } from '@mui/material';
import { IMG } from 'images';
import React, { useState } from 'react';
import { AiFillCamera } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../features/authSlice';
import Avatar from '../Avatar/Avatar';
import Modal from '../Modal/Modal';
import { BgCover, CoverOverLay, InputImgTrigger, StyledCoverImg } from './Styles';

interface Props {
  imgBgUrl: string;
  userId: string;
}

const CoverImg: React.FC<Props> = ({ imgBgUrl, userId }) => {
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
      <Avatar />
      {currentUser?.id === userId && (
        <InputImgTrigger>
          <Button onClick={openModalHandler}>
            <AiFillCamera />
            <span>Thêm ảnh bìa</span>
          </Button>
        </InputImgTrigger>
      )}
      {openModal && <Modal onClose={closeModalHandler} field="background" />}
    </StyledCoverImg>
  );
};

export default CoverImg;

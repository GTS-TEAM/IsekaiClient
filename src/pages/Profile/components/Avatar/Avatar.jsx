import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AvatarUser, AvatarWrap, ButtonPropUp } from './Styles';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../features/authSlice';
import { userSelector } from 'features/userSlice';
import Modal from '../Modal/Modal';
import { Overlay } from 'components';
import { useOverFlowHidden } from 'hooks/useOverFlowHidden';

const Avatar = () => {
  const { user: currentUser } = useSelector(authSelector);
  const { user } = useSelector(userSelector);
  const [openModal, setOpenModal] = useState(false);

  const openModalHandler = () => {
    setOpenModal(true);
  };

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  useOverFlowHidden(openModal);

  return (
    <React.Fragment>
      <AvatarWrap>
        <AvatarUser src={null || user?.avatar} sx={{ width: '11rem', height: '11rem' }} />
        {currentUser.id === user?.id && (
          <ButtonPropUp onClick={openModalHandler}>
            <AiOutlinePlus />
          </ButtonPropUp>
        )}
      </AvatarWrap>
      {openModal && <Modal onClose={closeModalHandler} />}
      {openModal && <Overlay onClose={closeModalHandler} />}
    </React.Fragment>
  );
};

export default Avatar;

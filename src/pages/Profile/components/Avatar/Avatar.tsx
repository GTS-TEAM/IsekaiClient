import Overlay from 'components/Overlay/Overlay';
import { userSelector } from 'features/userSlice';
import { useOverFlowHidden } from 'hooks/useOverFlowHidden';
import React, { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../features/authSlice';
import Modal from '../Modal/Modal';
import { AvatarUser, AvatarWrap, ButtonPropUp } from './Styles';

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
        {currentUser?.id === user?.id && (
          <ButtonPropUp onClick={openModalHandler}>
            <AiOutlinePlus />
          </ButtonPropUp>
        )}
      </AvatarWrap>
      {openModal && <Modal onClose={closeModalHandler} field="avatar" />}
      {openModal && <Overlay onClose={closeModalHandler} />}
    </React.Fragment>
  );
};

export default Avatar;

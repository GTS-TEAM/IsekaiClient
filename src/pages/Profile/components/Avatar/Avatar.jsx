import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { AvatarUser, AvatarWrap, ButtonPropUp } from './Styles';
import { useSelector } from 'react-redux';
import { authSelector } from '../../../../features/authSlice';

const Avatar = ({ userImg, userId }) => {
  const { user } = useSelector(authSelector);
  return (
    <AvatarWrap>
      <AvatarUser src={null || userImg} sx={{ width: '11rem', height: '11rem' }} />
      {user.id === userId && (
        <ButtonPropUp>
          <AiOutlinePlus />
        </ButtonPropUp>
      )}
    </AvatarWrap>
  );
};

export default Avatar;

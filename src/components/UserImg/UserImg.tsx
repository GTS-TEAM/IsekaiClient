import React from 'react';
import styled from './UserImg.module.scss';

interface Props {
  userImg: string;
}

const UserImg: React.FC<Props> = ({ userImg }) => {
  return (
    <div className={styled.user_img}>
      <img src={userImg} alt="" />
    </div>
  );
};

export default UserImg;

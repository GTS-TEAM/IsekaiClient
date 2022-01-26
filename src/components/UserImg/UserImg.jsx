import React from 'react';
import styled from './UserImg.module.scss';
const UserImg = ({ userImg }) => {
  return (
    <div className={styled.user_img}>
      <img src={userImg} alt="" />
    </div>
  );
};

export default UserImg;

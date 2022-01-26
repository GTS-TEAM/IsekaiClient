import React from 'react';
import { UserImg } from '..';
import { AiOutlineSend } from 'react-icons/ai';
import styled from './InputComment.module.scss';
import { useSelector } from 'react-redux';
import { authSelector } from '../../features/authSlice';
const InputComment = ({ onChange, onSendComment, disabledBtn, value, className = '' }) => {
  const { user } = useSelector(authSelector);
  return (
    <div className={`${styled.input_comment} ${className}`}>
      <UserImg userImg={user.profilePicture} />
      <div className={styled.input_wrap}>
        <input type="text" onChange={onChange} value={value} />
        <button disabled={disabledBtn} onClick={onSendComment}>
          <AiOutlineSend />
        </button>
      </div>
    </div>
  );
};

export default InputComment;

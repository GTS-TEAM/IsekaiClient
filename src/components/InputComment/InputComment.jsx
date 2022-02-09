import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { UserImg } from '..';
import { authSelector } from '../../features/authSlice';
import styled from './InputComment.module.scss';
const InputComment = ({ onChange, onSendComment, disabledBtn, value, className = '', onKeyDown, showText }) => {
  const { user } = useSelector(authSelector);
  return (
    <div>
      <div className={`${styled.input_comment} ${className}`}>
        <UserImg userImg={user?.avatar} />
        <div className={styled.input_wrap}>
          <input type="text" onChange={onChange} value={value} onKeyDown={onKeyDown} placeholder="Viết bình luận..." />
          <button disabled={disabledBtn} onClick={onSendComment}>
            <AiOutlineSend />
          </button>
        </div>
      </div>
      {showText && <span className={styled.exit}>Press esc to exit.</span>}
    </div>
  );
};

export default InputComment;

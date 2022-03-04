import { Avatar } from '@mui/material';
import React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { authSelector } from '../../features/authSlice';
import styled from './InputComment.module.scss';

interface Props {
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSendComment: () => void;
  disabledBtn?: boolean;
  value: string;
  className?: string;
  showText?: boolean | string;
  style?: React.CSSProperties;
}

const InputComment: React.FC<Props> = ({
  onChange,
  onKeyDown,
  onSendComment,
  showText,
  value,
  className,
  disabledBtn,
  style,
}) => {
  const { user } = useSelector(authSelector);
  return (
    <div>
      <div className={`${styled.input_comment} ${className}`} style={style}>
        <Avatar src={user?.avatar || ''} alt="" />
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

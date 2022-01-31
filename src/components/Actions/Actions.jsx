import { Stack } from '@mui/material';
import React from 'react';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiFillLike } from 'react-icons/ai';
import { StyledActions } from './Styles';

const Actions = ({ onLike, isLiked = false }) => {
  return (
    <StyledActions>
      <div onClick={onLike} className="like">
        <Stack direction="row" alignItems="center" columnGap="1rem" justifyContent="center">
          {isLiked ? <AiFillLike style={isLiked ? { color: 'var(--mainColor)' } : null} /> : <AiOutlineLike />}
          <span style={isLiked ? { color: 'var(--mainColor)' } : null}>Thích</span>
        </Stack>
      </div>
      <div className="comment">
        <Stack direction="row" alignItems="center" columnGap="1rem" justifyContent="center">
          <AiOutlineComment />
          <span>Bình luận</span>
        </Stack>
      </div>
      <div className="share">
        <Stack direction="row" alignItems="center" columnGap="1rem" justifyContent="center">
          <AiOutlineShareAlt />
          <span>Chia sẽ</span>
        </Stack>
      </div>
    </StyledActions>
  );
};

export default Actions;

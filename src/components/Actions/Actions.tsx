import { Stack } from '@mui/material';
import React from 'react';
import { AiFillLike, AiOutlineComment, AiOutlineLike, AiOutlineShareAlt } from 'react-icons/ai';
import { PostType } from '../../share/types';
import { StyledActions } from './Styles';

interface ActionsProps {
  onToggleComment?: () => void;
  onLike: () => void;
  post: PostType;
  className?: string;
}

const Actions: React.FC<ActionsProps> = ({ onToggleComment, post, className, onLike }) => {
  return (
    <StyledActions className={className}>
      <div onClick={onLike} className="like">
        <Stack direction="row" alignItems="center" columnGap="1rem" justifyContent="center">
          {post.liked ? <AiFillLike style={post.liked ? { color: 'var(--mainColor)' } : undefined} /> : <AiOutlineLike />}
          <span style={post.liked ? { color: 'var(--mainColor)' } : undefined}>Thích</span>
        </Stack>
      </div>
      <div className="comment" onClick={onToggleComment}>
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

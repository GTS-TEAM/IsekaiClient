import { Stack } from '@mui/material';
import { likePost } from 'features/postsSlice';
import React from 'react';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiFillLike } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { StyledActions } from './Styles';

const Actions = ({ onToggleComment, post, className }) => {
  const dispatch = useDispatch();
  const likePostHandler = () => {
    dispatch(likePost({ postId: post.id }));
  };

  return (
    <StyledActions className={className}>
      <div onClick={likePostHandler} className="like">
        <Stack direction="row" alignItems="center" columnGap="1rem" justifyContent="center">
          {post.liked ? <AiFillLike style={post.liked ? { color: 'var(--mainColor)' } : null} /> : <AiOutlineLike />}
          <span style={post.liked ? { color: 'var(--mainColor)' } : null}>Thích</span>
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

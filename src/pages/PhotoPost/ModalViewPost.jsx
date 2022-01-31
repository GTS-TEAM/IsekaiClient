import { Stack } from '@mui/material';
import { Actions, Comments, LiveStats, SlideImgPost, UserBlockPost } from 'components';
import { closeViewPost, setPostIdView } from 'features/uiSlice';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GrFormClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  ButtonAddFriend,
  ButtonClose,
  CommentsArea,
  Description,
  Post,
  SlideImgPostWrap,
  StyledModalViewPost,
} from './Styles';
const modal = document.querySelector('#modal');
const ModalViewPost = ({
  post,
  decreaseTotalCmt,
  increaseTotalCmt,
  onLike,
  isLiked,
  totalComment,
  totalLike,
  slideIndex,
}) => {
  const dispatch = useDispatch();
  const closeViewPostHandler = () => {
    dispatch(closeViewPost());
    dispatch(setPostIdView(null));
  };

  useEffect(() => {
    return () => closeViewPostHandler();
  }, []);

  return createPortal(
    <StyledModalViewPost
      initial={{
        opacity: 0,
        scale: 0.7,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.1,
        ease: 'linear',
      }}
    >
      <ButtonClose onClick={closeViewPostHandler}>
        <GrFormClose />
      </ButtonClose>
      <SlideImgPostWrap>
        <SlideImgPost images={post.image} slideIndex={slideIndex} />
      </SlideImgPostWrap>
      <Post>
        <Stack direction="row" alignItems="center" justifyContent="space-between" padding="1.2rem">
          <UserBlockPost
            userImg={post.user.profilePicture.toString()}
            userId={post.user.id}
            userName={post.user.username}
            time={post.created_at}
          />
          <ButtonAddFriend>Kết bạn</ButtonAddFriend>
        </Stack>
        {post.description.trim().length > 0 && <Description>{post.description}</Description>}
        <LiveStats totalLike={totalLike} totalComment={totalComment} />
        <div style={{ padding: '0 1.2rem' }}>
          <Actions onLike={onLike} isLiked={isLiked} />
        </div>
        <CommentsArea>
          <Comments postId={post.id} decreaseTotalCmt={decreaseTotalCmt} increaseTotalCmt={increaseTotalCmt} />
        </CommentsArea>
      </Post>
    </StyledModalViewPost>,
    modal,
  );
};

export default ModalViewPost;

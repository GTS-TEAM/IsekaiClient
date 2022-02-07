import { Stack } from '@mui/material';
import { Actions, Comments, LiveStats, SlideImgPost, UserBlockPost } from 'components';
import { authSelector } from 'features/authSlice';
import { closeViewPost, setPostIdView } from 'features/uiSlice';
import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { GrFormClose } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
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
const ModalViewPost = ({ post, slideIndex }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);
  const closeViewPostHandler = useCallback(() => {
    dispatch(closeViewPost());
    dispatch(setPostIdView(null));
  }, [dispatch]);

  useEffect(() => {
    return () => {
      closeViewPostHandler();
    };
  }, [closeViewPostHandler]);

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
            userImg={post.user.avatar.toString()}
            userId={post.user.id}
            userName={post.user.username}
            time={post.created_at}
          />
          {user.id !== post.user.id && <ButtonAddFriend>Kết bạn</ButtonAddFriend>}
        </Stack>
        {post.description.trim().length > 0 && <Description>{post.description}</Description>}
        <LiveStats totalLike={post.likes} totalComment={post.comments} />
        <div style={{ padding: '0 1.2rem' }}>
          <Actions post={post} />
        </div>
        <CommentsArea>
          <Comments postId={post.id} amountComment={post.comments} />
        </CommentsArea>
      </Post>
    </StyledModalViewPost>,
    modal,
  );
};

export default ModalViewPost;

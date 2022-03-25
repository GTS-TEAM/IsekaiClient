import { CircularProgress, Stack } from '@mui/material';
import Actions from 'components/Actions/Actions';
import Comments from 'components/Comments/Comments';
import LiveStats from 'components/LiveStats/LiveStats';
import SlideImgPost from 'components/SlideImgPost/SlideImgPost';
import UserBlockPost from 'components/UserBlockPost/UserBlockPost';
import { authSelector } from 'features/authSlice';
import { getSinglePost, likePost, postsSelector } from 'features/postsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ButtonAddFriend,
  ButtonClose,
  CommentsArea,
  Description,
  Post,
  PostHeader,
  SlideImgPostWrap,
  StyledDetail,
} from './Styles';
const ModalViewPost = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAppSelector(authSelector);
  const {
    timeline: { posts, loading },
  } = useAppSelector(postsSelector);
  const postId = searchParams.get('id') as string;
  const slideIndex = searchParams.get('index');
  const dispatch = useAppDispatch();

  const closeViewPostHandler = () => {
    navigate(-1);
  };

  const likePostHandler = () => {
    dispatch(likePost(postId));
  };

  useEffect(() => {
    dispatch(getSinglePost(postId as string));
  }, [postId, dispatch]);

  if (loading) {
    return (
      <React.Fragment>
        <CircularProgress
          sx={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', color: '#fff', zIndex: 103 }}
        />
      </React.Fragment>
    );
  }

  return (
    <StyledDetail>
      <ButtonClose onClick={closeViewPostHandler}>
        <GrFormClose />
      </ButtonClose>
      <SlideImgPostWrap>
        <SlideImgPost images={posts[0].image || []} slideIndex={slideIndex ? +slideIndex : 0} />
      </SlideImgPostWrap>
      <Post>
        <PostHeader>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <UserBlockPost
              userImg={posts[0].user?.avatar.toString()}
              userId={posts[0].user?.id}
              userName={posts[0].user?.username}
              time={posts[0].created_at}
            />
            {user?.id !== posts[0].user?.id && <ButtonAddFriend>Kết bạn</ButtonAddFriend>}
          </Stack>
          {posts[0].description?.trim().length > 0 && <Description>{posts[0].description}</Description>}
          <LiveStats totalLike={posts[0].likeCount || 0} totalComment={posts[0].commentCount || 0} haveUserLiked={false} />
        </PostHeader>
        <div style={{ padding: '0 1.2rem' }}>
          <Actions post={posts[0]} onLike={likePostHandler} />
        </div>
        <CommentsArea>
          <Comments postId={postId ? postId : ''} amountComment={posts[0].comments} />
        </CommentsArea>
      </Post>
    </StyledDetail>
  );
};

export default ModalViewPost;

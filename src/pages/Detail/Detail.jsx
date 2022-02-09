import { CircularProgress, Stack } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { Actions, Comments, LiveStats, Overlay, SlideImgPost, UserBlockPost } from 'components';
import { authSelector } from 'features/authSlice';
import React, { useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ButtonAddFriend, ButtonClose, CommentsArea, Description, Post, SlideImgPostWrap, StyledDetail } from './Styles';
const ModalViewPost = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useSelector(authSelector);
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(false);
  const postId = searchParams.get('id');
  const slideIndex = searchParams.get('index');

  const closeViewPostHandler = () => {
    navigate(-1);
  };

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const data = await isekaiApi.getPost(postId);
      setPost(data);
      setLoading(false);
    };

    getPost();
  }, [postId]);

  if (loading) {
    return (
      <React.Fragment>
        <Overlay style={{ backgroundColor: 'rgba(0,0,0,0.8)' }} />
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
        <SlideImgPost images={post.image || []} slideIndex={slideIndex} />
      </SlideImgPostWrap>
      <Post>
        <Stack direction="row" alignItems="center" justifyContent="space-between" padding="1.2rem">
          <UserBlockPost
            userImg={post.user?.avatar.toString()}
            userId={post.user?.id}
            userName={post.user?.username}
            time={post.created_at}
          />
          {user.id !== post.user?.id && <ButtonAddFriend>Kết bạn</ButtonAddFriend>}
        </Stack>
        {post.description?.trim().length > 0 && <Description>{post.description}</Description>}
        <LiveStats totalLike={post.likeCount || 0} totalComment={post.commentCount || 0} haveUserLiked={false} />
        <div style={{ padding: '0 1.2rem' }}>
          <Actions post={post} />
        </div>
        <CommentsArea>
          <Comments postId={postId} amountComment={post.comments} />
        </CommentsArea>
      </Post>
    </StyledDetail>
  );
};

export default ModalViewPost;

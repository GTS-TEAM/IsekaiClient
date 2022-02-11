import { CircularProgress, Stack } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import Actions from 'components/Actions/Actions';
import Comments from 'components/Comments/Comments';
import LiveStats from 'components/LiveStats/LiveStats';
import Overlay from 'components/Overlay/Overlay';
import SlideImgPost from 'components/SlideImgPost/SlideImgPost';
import UserBlockPost from 'components/UserBlockPost/UserBlockPost';
import { authSelector } from 'features/authSlice';
import { useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { likePost } from '../../features/postsSlice';
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
  const dispatch = useDispatch();
  const { user } = useAppSelector(authSelector);
  const [post, setPost] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const postId = searchParams.get('id');
  const slideIndex = searchParams.get('index');

  const closeViewPostHandler = () => {
    navigate(-1);
  };

  const likePostHandler = () => {
    if (post) {
      setPost((post: any) => {
        if (post.liked) {
          return {
            ...post,
            likeCount: post.likeCount - 1,
            liked: !post.liked,
          };
        }
        return {
          ...post,
          likeCount: post.likeCount + 1,
          liked: !post.liked,
        };
      });

      dispatch(likePost(post.id));
    }
  };

  useEffect(() => {
    const getPost = async () => {
      setLoading(true);
      const { data } = await isekaiApi.getPost(postId || '');
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
        <SlideImgPost images={post.image || []} slideIndex={slideIndex ? +slideIndex : 0} />
      </SlideImgPostWrap>
      <Post>
        <PostHeader>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <UserBlockPost
              userImg={post.user?.avatar.toString()}
              userId={post.user?.id}
              userName={post.user?.username}
              time={post.created_at}
            />
            {user?.id !== post.user?.id && <ButtonAddFriend>Kết bạn</ButtonAddFriend>}
          </Stack>
          {post.description?.trim().length > 0 && <Description>{post.description}</Description>}
          <LiveStats totalLike={post.likeCount || 0} totalComment={post.commentCount || 0} haveUserLiked={false} />
        </PostHeader>
        <div style={{ padding: '0 1.2rem' }}>
          <Actions post={post} onLike={likePostHandler} />
        </div>
        <CommentsArea>
          <Comments postId={postId ? postId : ''} amountComment={post.comments} />
        </CommentsArea>
      </Post>
    </StyledDetail>
  );
};

export default ModalViewPost;

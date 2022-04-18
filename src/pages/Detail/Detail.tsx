import { CircularProgress, Stack } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import Actions from 'components/Actions/Actions';
import Comments from 'components/Comments/Comments';
import LiveStats from 'components/LiveStats/LiveStats';
import SlideImgPost from 'components/SlideImgPost/SlideImgPost';
import UserBlockPost from 'components/UserBlockPost/UserBlockPost';
import { authSelector } from 'features/authSlice';
import { postsSelector } from 'features/postsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PostItem, User } from 'share/types';
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
  const [post, setPost] = useState<PostItem | null>(null);
  const dispatch = useAppDispatch();

  const increaseCmtHandle = () => {
    if (post) {
      setPost({
        ...post,
        commentCount: post.commentCount + 1,
      });
    }
  };

  const closeViewPostHandler = () => {
    navigate(-1);
  };

  const likePostHandler = async () => {
    const indexUserLikedPost = post?.likes.findIndex((like) => like.id === user?.id) as number;

    if (post) {
      if (post?.likes[indexUserLikedPost]) {
        setPost((_post) => {
          return {
            ..._post,
            likes: _post?.likes.filter((value) => value.id !== user?.id),
          } as PostItem;
        });
      } else {
        setPost((_post) => {
          return {
            ..._post,
            likes: [user, ...(_post?.likes as User[])],
          } as PostItem;
        });
      }
      setPost((_post) => {
        return {
          ..._post,
          liked: !(_post?.liked as boolean),
        } as PostItem;
      });
      setPost((_post) => {
        if (_post?.liked) {
          return {
            ..._post,
            likeCount: _post?.likeCount + 1,
          } as PostItem;
        }
        return {
          ..._post,
          likeCount: (_post?.likeCount as number) - 1,
        } as PostItem;
      });

      await isekaiApi.likePost(post.id);
    }
  };

  useEffect(() => {
    if (postId) {
      isekaiApi
        .getPost(postId)
        .then((value) => {
          setPost(value.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [postId, dispatch]);

  useEffect(() => {
    console.log(post);
  }, [post]);

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
        <SlideImgPost images={(post?.image as string[]) || []} slideIndex={slideIndex ? +slideIndex : 0} />
      </SlideImgPostWrap>
      <Post>
        <PostHeader>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {post && (
              <UserBlockPost
                userImg={post.user?.avatar.toString()}
                userId={post.user?.id}
                userName={post?.user?.username}
                time={post?.created_at}
              />
            )}
            {user?.id !== post?.user?.id && <ButtonAddFriend>Kết bạn</ButtonAddFriend>}
          </Stack>
          {(post?.description?.trim().length as number) > 0 && <Description>{post?.description}</Description>}
          <LiveStats totalLike={post?.likeCount || 0} totalComment={post?.commentCount || 0} haveUserLiked={false} />
        </PostHeader>
        <div style={{ padding: '0 1.2rem' }}>
          <Actions post={post as PostItem} onLike={likePostHandler} />
        </div>
        <CommentsArea>
          <Comments postId={postId ? postId : ''} amountComment={post?.comments} onIncreaseCmt={increaseCmtHandle} />
        </CommentsArea>
      </Post>
    </StyledDetail>
  );
};

export default ModalViewPost;

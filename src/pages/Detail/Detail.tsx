import { Stack } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import Actions from 'components/Actions/Actions';
import Comments from 'components/Comments/Comments';
import LiveStats from 'components/LiveStats/LiveStats';
import SlideImgPost from 'components/SlideImgPost/SlideImgPost';
import UserBlockPost from 'components/UserBlockPost/UserBlockPost';
import { authSelector } from 'features/authSlice';
import { getOnePost } from 'features/postsSlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useState } from 'react';
import { GrFormClose } from 'react-icons/gr';
import { useNavigate, useParams } from 'react-router-dom';
import { PostItem, User } from 'share/types';
import {
  ButtonClose,
  CommentsArea,
  Description,
  Post as StyledPost,
  PostHeader,
  SlideImgPostWrap,
  StyledDetail,
} from './Styles';
const ModalViewPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAppSelector(authSelector);
  const dispatch = useAppDispatch();
  const [post, setPost] = useState<PostItem | null>(null);

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
    if (id) {
      isekaiApi
        .getPost(id)
        .then((value) => {
          setPost(value.data);
          dispatch(getOnePost(value.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, dispatch]);

  return (
    <StyledDetail>
      {post && post.image.length > 0 && (
        <>
          <ButtonClose onClick={closeViewPostHandler}>
            <GrFormClose />
          </ButtonClose>
          <SlideImgPostWrap>
            <SlideImgPost images={(post?.image as string[]) || []} slideIndex={0} />
          </SlideImgPostWrap>
        </>
      )}
      <StyledPost>
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
          </Stack>
          {(post?.description?.trim().length as number) > 0 && <Description>{post?.description}</Description>}
          <LiveStats totalLike={post?.likeCount || 0} totalComment={post?.commentCount || 0} haveUserLiked={false} />
        </PostHeader>
        <div>
          <Actions post={post as PostItem} onLike={likePostHandler} />
        </div>
        <CommentsArea>
          <Comments postId={id ? id : ''} amountComment={post?.comments} onIncreaseCmt={increaseCmtHandle} />
        </CommentsArea>
      </StyledPost>
    </StyledDetail>
  );
};

export default ModalViewPost;

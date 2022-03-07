import { Box, Stack } from '@mui/material';
import Actions from 'components/Actions/Actions';
import Comments from 'components/Comments/Comments';
import GridImg from 'components/GridImg/GridImg';
import LiveStats from 'components/LiveStats/LiveStats';
import ModalPost from 'components/ModalPost/ModalPost';
import More from 'components/More/More';
import Overlay from 'components/Overlay/Overlay';
import UserBlockPost from 'components/UserBlockPost/UserBlockPost';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useEffect, useRef, useState } from 'react';
import { PostItem } from 'share/types';
import { authSelector } from '../../features/authSlice';
import {
  addPostEmotion,
  addPostFullImg,
  changePostText,
  clearPostEmotion,
  clearPostImg,
  deletePost,
  likePost,
} from '../../features/postsSlice';
import { closeEditPostModal, openEditPostModal, setPostIdEdit, uiSelector } from '../../features/uiSlice';
import { useOverFlowHidden } from '../../hooks/useOverFlowHidden';
import emotions from '../../utils/emotions';
import { Body, Description, Header, StyledPost } from './Styles';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
interface Props {
  post: PostItem;
}

const Post: React.FC<Props> = ({ post }) => {
  const [isOpenComment, setIsOpenComment] = useState<boolean>(false);
  const { user: currentUser } = useAppSelector(authSelector);
  const [anchorElPost, setAnchorElPost] = React.useState<null | HTMLElement>(null);
  const [isReadMore, setIsReaMore] = useState<boolean>(false);
  const [haveReadMore, setHaveReadMore] = useState<boolean>(false);
  const descRef = useRef<HTMLParagraphElement | null>(null);

  const { modalPost: uiModalPost } = useAppSelector(uiSelector);

  const openPost = Boolean(anchorElPost);

  const dispatch = useAppDispatch();

  const clickOpenMenuHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPost(event.currentTarget);
  };
  const clickCloseMenuHandler = () => {
    setAnchorElPost(null);
  };

  const closeModalCreatePostHandler = () => {
    dispatch(closeEditPostModal());
    dispatch(clearPostEmotion());
    dispatch(clearPostImg());
    dispatch(changePostText(''));
  };

  const clickEditHandler = () => {
    clickCloseMenuHandler();
    dispatch(setPostIdEdit(post.id));
    dispatch(openEditPostModal(post.id));
    dispatch(changePostText(post.description));
    dispatch(addPostFullImg(post.image));
    dispatch(addPostEmotion(emotions.find((emotion) => emotion.id === post.emoji)));
  };

  const clickRemoveHandler = () => {
    clickCloseMenuHandler();
    dispatch(deletePost(post.id));
  };

  const toggleOpenCommentHandler = () => {
    setIsOpenComment(!isOpenComment);
  };

  const likePostHandler = () => {
    dispatch(likePost(post.id));
  };

  useOverFlowHidden(uiModalPost.isOpenEdit);

  useEffect(() => {
    if ((descRef.current?.offsetHeight as number) >= 500) {
      setHaveReadMore(true);
    } else {
      setHaveReadMore(false);
    }
  }, []);

  return (
    <StyledPost>
      <Header>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <UserBlockPost
            userImg={post.user.avatar}
            userId={post.user.id}
            userName={post.user.username}
            time={post.created_at}
            emoji={post.emoji}
          />
          {post.user.id === currentUser?.id && (
            <More
              anchorEl={anchorElPost}
              open={openPost}
              onOpenMenu={clickOpenMenuHandler}
              onCloseMenu={clickCloseMenuHandler}
              onClickOpenEdit={clickEditHandler}
              onClickRemove={clickRemoveHandler}
              height="3.6rem"
              width="3.6rem"
              heightIcon="2.4rem"
              widthIcon="2.4rem"
            />
          )}
        </Stack>
      </Header>
      <Body>
        {post.description.length !== 0 && (
          <Box
            sx={{
              span: {
                fontSize: '1.4rem',
                color: 'var(--mainColor)',
                lineHeight: '1.5',
                fontWeight: '500',
                cursor: 'pointer',

                '&:hover': {
                  textDecoration: 'underline',
                },
              },
            }}
          >
            {post.description.includes('https') && (
              <Description
                ref={descRef}
                haveReadMore={haveReadMore}
                isReadMore={isReadMore}
                includeUrl={post.description.includes('https')}
              >
                {post.description}
                <LinkPreview url={post.description} width="auto" />
              </Description>
            )}
            <Description
              ref={descRef}
              haveReadMore={haveReadMore}
              isReadMore={isReadMore}
              includeUrl={post.description.includes('https')}
            >
              {post.description}
            </Description>
            {haveReadMore && !isReadMore && (
              <span
                onClick={() => {
                  setIsReaMore(true);
                }}
              >
                Đọc thêm
              </span>
            )}
          </Box>
        )}
        {post.image.length === 0 ? null : <GridImg post={post} />}
        <LiveStats
          totalLike={post.likeCount}
          totalComment={post.commentCount}
          className="live-stats"
          userLiked={post.likes}
          haveUserLiked={true}
        />
      </Body>
      <Actions post={post} onToggleComment={toggleOpenCommentHandler} className="actions" onLike={likePostHandler} />
      {isOpenComment && <Comments postId={post.id} amountComment={post.commentCount} />}
      {uiModalPost.isOpenEdit && post.id === uiModalPost.idPostEdit && <Overlay onClose={closeModalCreatePostHandler} />}
      {uiModalPost.isOpenEdit && post.id === uiModalPost.idPostEdit && (
        <ModalPost type="edit" postId={post.id} onCloseModal={closeModalCreatePostHandler} />
      )}
    </StyledPost>
  );
};

export default Post;

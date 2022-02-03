import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Comments, ModalCreatePost, More, Overlay, GridImg, Actions, LiveStats, UserBlockPost } from '..';
import emotions from '../../utils/emotions';
import { authSelector } from '../../features/authSlice';
import { useDispatch } from 'react-redux';
import {
  addPostEmotion,
  addPostFullImg,
  changePostText,
  clearPostEmotion,
  clearPostImg,
  deletePost,
} from '../../features/postsSlice';
import { openEditPostModal, closeEditPostModal, uiSelector, setPostIdEdit } from '../../features/uiSlice';
import { useOverFlowHidden } from '../../hooks/useOverFlowHidden';
import { Stack } from '@mui/material';
import { Body, Description, Header, StyledPost } from './Styles';

const Post = ({ post }) => {
  const [isOpenComment, setIsOpenComment] = useState(false);
  const { user: currentUser } = useSelector(authSelector);
  const [anchorElPost, setAnchorElPost] = React.useState(null);

  const ui = useSelector(uiSelector);

  const openPost = Boolean(anchorElPost);

  const dispatch = useDispatch();

  const clickOpenMenuHandler = (event) => {
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

  useOverFlowHidden(ui.createPostModal.isOpenEdit);

  return (
    <StyledPost>
      <Header>
        <Stack alignItems="center" direction="row" justifyContent="space-between">
          <UserBlockPost
            userImg={post.user.profilePicture}
            userId={post.user.id}
            userName={post.user.username}
            time={post.created_at}
            emoji={post.emoji}
          />
          {post.user.id === currentUser.id && (
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
        <Description>{post.description}</Description>
        {post.image.length === 0 ? null : <GridImg post={post} />}
        <LiveStats totalLike={post.likes} totalComment={post.comments} className="live-stats" />
      </Body>
      <Actions post={post} onToggleComment={toggleOpenCommentHandler} className="actions" />
      {isOpenComment && <Comments postId={post.id} amountComment={post.comments} />}
      {ui.createPostModal.isOpenEdit && post.id === ui.createPostModal.idPostEdit && (
        <Overlay onClose={closeModalCreatePostHandler} />
      )}
      {ui.createPostModal.isOpenEdit && post.id === ui.createPostModal.idPostEdit && (
        <ModalCreatePost type="edit" postId={post.id} onCloseModal={closeModalCreatePostHandler} />
      )}
    </StyledPost>
  );
};

export default Post;

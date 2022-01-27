import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiFillLike } from 'react-icons/ai';
import { Comments, Overlay, UserImg } from '..';
import classes from './Post.module.scss';
import { isekaiApi } from '../../api/isekaiApi';
import emotions from '../../utils/emotions';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { Menu, Button, MenuItem, ButtonBase } from '@mui/material';
import styled from '@emotion/styled';
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
import { ModalCreatePost } from '../../pages/Homepage/components';
import { useOverFlowHidden } from '../../hooks/useOverFlowHidden';

const StyledButton = styled(Button)`
  width: 3.6rem;
  height: 3.6rem;
  min-width: unset;
  padding: 0;
  background-color: var(--grayColor1);
  color: unset;
  border-radius: 50%;
  border: 1px solid var(--borderColor);

  svg {
    color: var(--textColorGray);
    width: 2.4rem;
    height: 2.4rem;
  }
`;

const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -2px rgb(0 0 0 / 10%);
    border: 1px solid var(--borderColor);
  }

  .MuiMenuItem-root {
    font-size: 1.3rem;
  }
`;

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [totalLike, setTotalLike] = useState(post.likes);
  const [totalComment, setTotalComment] = useState(post.comments);
  const { user: currentUser } = useSelector(authSelector);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const ui = useSelector(uiSelector);

  const open = Boolean(anchorEl);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeModalCreatePostHandler = () => {
    dispatch(closeEditPostModal());
    dispatch(clearPostEmotion());
    dispatch(clearPostImg());
    dispatch(changePostText(''));
  };

  const clickEditHandler = () => {
    handleClose();
    dispatch(setPostIdEdit(post.id));
    dispatch(openEditPostModal(post.id));
    dispatch(changePostText(post.description));
    dispatch(addPostFullImg(post.image));
    dispatch(addPostEmotion(post.emoji));
  };

  const clickDeleteHandler = () => {
    handleClose();
    dispatch(deletePost(post.id));
  };

  useOverFlowHidden(ui.createPostModal.isOpenEdit);

  const getEmotion = useCallback((emoji) => {
    return emotions.find((emotion) => emotion.id === emoji);
  }, []);

  const emoji = getEmotion(post.emoji);

  const likePostHandler = async () => {
    setIsLiked(!isLiked);
    setTotalLike((totalLike) => {
      if (isLiked) {
        return totalLike - 1;
      } else {
        return totalLike + 1;
      }
    });
    await isekaiApi.likePost(post.id);
  };

  const increaseTotalCmtHandler = () => {
    setTotalComment((prev) => prev + 1);
  };

  const decreaseTotalCmtHandler = () => {
    setTotalComment((prev) => prev - 1);
  };

  return (
    <div className={classes.post}>
      <div className={classes.post__header}>
        <div className={classes.info}>
          <Link to={'/user'}>
            <UserImg userImg={post.user.profilePicture} />
          </Link>
          <div>
            <p className={classes.user_status}>
              {post.user.username} {emoji && ` đang cảm thấy ${emoji.name}`}
              {emoji && <img src={emoji.icon} alt="" />}
            </p>
            <div className={classes.created_at}>{moment(post.created_at, moment.defaultFormat).fromNow()}</div>
          </div>
        </div>
        {post.user.id === currentUser.id && (
          <div className={classes.actions}>
            <StyledButton onClick={handleClick}>
              <BiDotsHorizontalRounded />
            </StyledButton>
            <ButtonBase></ButtonBase>
            <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem onClick={clickEditHandler}>Chỉnh sửa</MenuItem>
              <MenuItem onClick={clickDeleteHandler}>Xóa</MenuItem>
            </StyledMenu>
          </div>
        )}
      </div>
      <div className={classes.content}>{post.description}</div>
      {post.image.length === 0
        ? null
        : post.image.map((item) => {
            return (
              <div className={classes.img} key={item}>
                <img src={item} alt="" />
              </div>
            );
          })}

      {totalComment !== 0 || totalLike !== 0 ? (
        <div className={classes.figures}>
          {totalLike !== 0 && (
            <div className={classes.total_like}>
              <span>{totalLike} luợt thích</span>
            </div>
          )}
          {totalComment !== 0 && <div className={classes.total_comment}>{totalComment} bình luận</div>}
        </div>
      ) : null}
      <div className={classes.post__bottom}>
        <div className={classes.interacts}>
          <div className={`${classes.like} ${isLiked ? classes.liked : ''}`} onClick={likePostHandler}>
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
            <span>Thích</span>
          </div>
          <div
            className={classes.comment}
            onClick={() => {
              setIsOpenComment(!isOpenComment);
            }}
          >
            <AiOutlineComment />
            <span>Bình luận</span>
          </div>
          <div className={classes.share}>
            <AiOutlineShareAlt />
            <span>Chia sẻ</span>
          </div>
        </div>
      </div>
      {isOpenComment && (
        <Comments postId={post.id} decreaseTotalCmt={decreaseTotalCmtHandler} increaseTotalCmt={increaseTotalCmtHandler} />
      )}
      {ui.createPostModal.isOpenEdit && post.id === ui.createPostModal.idPostEdit && <Overlay />}
      {ui.createPostModal.isOpenEdit && post.id === ui.createPostModal.idPostEdit && (
        <ModalCreatePost
          style={
            ui.createPostModal.isOpenEdit
              ? {
                  top: '50%',
                  opacity: '1',
                  visibility: 'visible',
                  transform: 'translate(-50%, -50%)',
                }
              : null
          }
          type="edit"
          postId={post.id}
          onCloseModal={closeModalCreatePostHandler}
        />
      )}
    </div>
  );
};

export default Post;

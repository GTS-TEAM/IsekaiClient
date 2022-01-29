import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiFillLike } from 'react-icons/ai';
import { Comments, ModalCreatePost, More, Overlay, SlideImgPost, UserImg } from '..';
import classes from './Post.module.scss';
import { isekaiApi } from '../../api/isekaiApi';
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
import { Menu, MenuItem } from '@mui/material';

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [totalLike, setTotalLike] = useState(post.likes);
  const [totalComment, setTotalComment] = useState(post.comments);
  const { user: currentUser } = useSelector(authSelector);
  const [userLiked, setUserLiked] = useState([]);
  const [anchorElPost, setAnchorElPost] = React.useState(null);
  const [anchorElLike, setAnchorElLike] = React.useState(null);

  const ui = useSelector(uiSelector);

  const openPost = Boolean(anchorElPost);

  const dispatch = useDispatch();

  const mouseEnterHandler = (event) => {
    console.log('enter');
    setAnchorElLike(event.currentTarget);
  };
  const mouseLeaveHandler = (event) => {
    console.log('leave');
    setAnchorElLike(null);
  };

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

  useOverFlowHidden(ui.createPostModal.isOpenEdit);

  const getEmotion = useCallback((emoji) => {
    return emotions.find((emotion) => emotion.id === emoji);
  }, []);

  const emoji = getEmotion(post.emoji);

  const likePostHandler = async () => {
    setIsLiked(!isLiked);
    // if (isLiked) {
    //   setUserLiked([
    //     ...userLiked,
    //     {
    //       background: currentUser.background,
    //       id: currentUser.id,
    //       profilePicture: currentUser.profilePicture,
    //       username: currentUser.username,
    //     },
    //   ]);
    // } else {

    // }
    setUserLiked((prev) => {
      if (isLiked) {
        const userLikedClone = [...prev];
        return userLikedClone.filter((item) => item.id !== currentUser.id);
      }
      return [
        ...userLiked,
        {
          background: currentUser.background,
          id: currentUser.id,
          profilePicture: currentUser.profilePicture,
          username: currentUser.username,
        },
      ];
    });
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

  useEffect(() => {
    const getUserLiked = async () => {
      const data = await isekaiApi.getUserLikedPost(post.id);
      setUserLiked(data[0].likes);
    };
    getUserLiked();
  }, [post.id]);

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
      </div>
      <div className={classes.content}>{post.description}</div>
      {post.image.length === 0 ? null : <SlideImgPost images={post.image} />}

      {totalComment !== 0 || totalLike !== 0 ? (
        <div className={classes.figures}>
          {totalLike !== 0 && (
            <div className={classes.total_like}>
              <span>{totalLike} luợt thích</span>
              <div className={classes.dropdown}>
                {userLiked.map((item) => (
                  <div key={item.id}>{item.id === currentUser.id ? 'You' : item.username}</div>
                ))}
              </div>
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

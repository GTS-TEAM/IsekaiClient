import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiFillLike } from 'react-icons/ai';
import { Comments, UserImg } from '..';
import classes from './Post.module.scss';
import { isekaiApi } from '../../api/isekaiApi';
import { authSelector } from '../../features/authSlice';
import styled from 'styled-components';

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [totalLike, setTotalLike] = useState(post.likes);
  const [totalComment, setTotalComment] = useState(post.comments);
  const { user: currentUser } = useSelector(authSelector);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <p className={classes.user_name}>{post.user.username}</p>
            <div className={classes.created_at}>{moment(post.created_at, moment.defaultFormat).fromNow()}</div>
          </div>
        </div>
        {post.user.id === currentUser.id && (
          <div className={classes.actions}>
            {/* <ButtonActions onClick={handleClick}>
              <BiDotsHorizontalRounded />
            </ButtonActions> */}
            {/* <MenuActions anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem>Chỉnh sửa</MenuItem>
              <MenuItem>Xóa</MenuItem>
            </MenuActions> */}
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

      <div className={classes.figures}>
        <div className={classes.total_like}>
          <span>{totalLike} luợt thích</span>
        </div>
        <div className={classes.total_comment}>{totalComment} bình luận</div>
      </div>
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
    </div>
  );
};

export default Post;

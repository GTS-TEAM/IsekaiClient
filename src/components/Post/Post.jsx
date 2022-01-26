import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiFillLike } from 'react-icons/ai';
import { Comments, UserImg } from '..';
import classes from './Post.module.scss';
import { isekaiApi } from '../../api/isekaiApi';
import { authSelector } from '../../features/authSlice';
import { Button } from '@mui/material';
import { styled } from '@mui/styles';

const ButtonActions = styled(Button)({
  height: '3.6rem',
  width: ' 3.6rem',
  display: 'flex',
  alignItems: ' center',
  justifyContent: ' center',
  borderRadius: '50%',
  backgroundColor: ' var(--grayColor1)',
  cursor: 'pointer',
  minWidth: 'unset',
  padding: 0,
  color: 'unset',

  '& svg': {
    width: '2.4rem',
    height: '2.4rem',
    color: ' var(--textColorGray)',
  },
});

const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [totalLike, setTotalLike] = useState(post.likes);
  const { user: currentUser } = useSelector(authSelector);
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

  useEffect(() => {
    const getUser = async () => {
      const data = await isekaiApi.getUser(post.user.id);
      setUser(data);
    };
    getUser();
  }, [post.user.id]);

  return (
    <div className={classes.post}>
      <div className={classes.post__header}>
        <div className={classes.info}>
          <Link to={'/user'}>
            <UserImg userImg={user.profilePicture} />
          </Link>
          <div>
            <p className={classes.user_name}>{user.username}</p>
            <div className={classes.created_at}>{moment(post.created_at, moment.defaultFormat).fromNow()}</div>
          </div>
        </div>
        {post.user.id === currentUser.id && (
          <div className={classes.actions}>
            {/* <div className={classes.actions_btn}>
            </div>
          <div className={classes.actions_dropdown}></div> */}
            <ButtonActions>
              <BiDotsHorizontalRounded />
            </ButtonActions>
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

      {post.comments === 0 && post.likes === 0 ? null : (
        <div className={classes.figures}>
          {totalLike !== 0 && (
            <div className={classes.total_like}>
              <AiFillLike />
              <span>{totalLike}</span>
            </div>
          )}
          {post.comments !== 0 && <div className={classes.total_comment}>{post.comments} bình luận</div>}
        </div>
      )}
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
      {isOpenComment && <Comments postId={post.id} />}
    </div>
  );
};

export default Post;

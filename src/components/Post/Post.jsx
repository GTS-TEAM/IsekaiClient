import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { AiOutlineLike, AiOutlineComment, AiOutlineShareAlt, AiFillLike } from 'react-icons/ai';
import { Comments, UserImg } from '..';
import styled from './Post.module.scss';
import { isekaiApi } from '../../api/isekaiApi';
import { authSelector } from '../../features/authSlice';
const Post = ({ post }) => {
  const [user, setUser] = useState({});
  const [isLiked, setIsLiked] = useState(post.liked);
  const [isOpenComment, setIsOpenComment] = useState(false);
  const [totalLike, setTotalLike] = useState(post.likes);
  const { token, user: currentUser } = useSelector(authSelector);

  const likePostHandler = async () => {
    setIsLiked(!isLiked);
    setTotalLike((totalLike) => {
      if (isLiked) {
        return totalLike - 1;
      } else {
        return totalLike + 1;
      }
    });
    await isekaiApi.likePost(post.id, token.accessToken);
  };

  useEffect(() => {
    const getUser = async () => {
      const data = await isekaiApi.getUser(post.user.id, token.accessToken);
      setUser(data);
    };
    getUser();
  }, [post.user.id, token.accessToken]);

  return (
    <div className={styled.post}>
      <div className={styled.post__header}>
        <div className={styled.info}>
          <Link to={'/user'}>
            <UserImg userImg={user.profilePicture} />
          </Link>
          <div>
            <p className={styled.user_name}>{user.username}</p>
            <div className={styled.created_at}>{moment(post.created_at, moment.defaultFormat).fromNow()}</div>
          </div>
        </div>
        {post.user.id === currentUser.id && (
          <div className={styled.actions}>
            <div className={styled.actions_btn}>
              <BiDotsHorizontalRounded />
            </div>
            <div className={styled.actions_dropdown}></div>
          </div>
        )}
      </div>
      <div className={styled.content}>{post.description}</div>
      {post.image.length === 0 ? null : (
        <div className={styled.img}>
          <img src={post.image} alt="" />
        </div>
      )}

      {post.comments !== 0 ||
        (totalLike !== 0 && (
          <div className={styled.figures}>
            {totalLike !== 0 && (
              <div className={styled.total_like}>
                <AiFillLike />
                <span>{totalLike}</span>
              </div>
            )}
            {post.comments !== 0 && <div className={styled.total_comment}>{post.comments}</div>}
          </div>
        ))}
      <div className={styled.post__bottom}>
        <div className={styled.interacts}>
          <div className={`${styled.like} ${isLiked ? styled.liked : ''}`} onClick={likePostHandler}>
            {isLiked ? <AiFillLike /> : <AiOutlineLike />}
            <span>Thích</span>
          </div>
          <div
            className={styled.comment}
            onClick={() => {
              setIsOpenComment(!isOpenComment);
            }}
          >
            <AiOutlineComment />
            <span>Bình luận</span>
          </div>
          <div className={styled.share}>
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

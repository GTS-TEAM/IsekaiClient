import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InputComment } from '..';
import { isekaiApi } from '../../api/isekaiApi';
import { authSelector } from '../../features/authSlice';
import styled from './Comments.module.scss';
import Comment from './Comment';
import { LoadMore, StyledListComments } from './Styles';

const Comments = ({ postId, increaseTotalCmt, decreaseTotalCmt }) => {
  const { user } = useSelector(authSelector);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [openEditComment, setOpenEditComment] = useState(null);
  const [offset, setOffset] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const commentTextChangeHandler = (e) => {
    setCommentText(e.target.value);
    if (e.target.value.trim().length === 0) {
      setDisabledButton(true);
      return;
    }
    setDisabledButton(false);
  };

  const sendCommentHandler = async () => {
    if (commentText.trim().length === 0) {
      setDisabledButton(true);
      return;
    }
    setDisabledButton(false);
    const { content, created_at, id } = await isekaiApi.commentPost(postId, commentText);
    const newComment = {
      content,
      created_at,
      id,
      user,
    };
    increaseTotalCmt();
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const loadMoreCommentsHandler = async () => {
    setLoading(true);
    const data = await isekaiApi.getCommentsPost(postId, offset + 1);
    setLoading(false);
    if (data.length > 0) {
      setHasMore(true);
      setOffset(offset + 1);
      setComments([...comments, ...data]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    let isActive = true; // component mounted
    const getCommentsPost = async () => {
      const data = await isekaiApi.getCommentsPost(postId, 1);
      if (isActive) {
        if (data.length > 0) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        setComments(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
      }
    };

    getCommentsPost();

    return () => {
      isActive = false;
    };
  }, [postId]);

  return (
    <div className={styled.comments}>
      <InputComment
        onChange={commentTextChangeHandler}
        onSendComment={sendCommentHandler}
        disabledBtn={disabledButton}
        value={commentText}
        className={styled.input_comments}
        onKeyDown={(e) => {
          if (e.keyCode === 13) {
            sendCommentHandler();
          }
          if (e.keyCode === 27) {
            setOpenEditComment(false);
          }
        }}
      />
      <StyledListComments>
        {comments.map((item) => (
          <Comment
            key={item.id}
            openEditComment={openEditComment}
            setOpenEditComment={setOpenEditComment}
            item={item}
            setComments={setComments}
            decreaseTotalCmt={decreaseTotalCmt}
            user={user}
          />
        ))}
      </StyledListComments>
      {hasMore && <LoadMore onClick={loadMoreCommentsHandler}>{loading ? 'Loading...' : 'Xem thêm bình luận'}</LoadMore>}
    </div>
  );
};

export default Comments;

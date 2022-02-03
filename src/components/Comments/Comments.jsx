import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputComment } from '..';
import { isekaiApi } from '../../api/isekaiApi';
import { authSelector } from '../../features/authSlice';
import styled from './Comments.module.scss';
import Comment from './Comment';
import { Bottom, LoadMore, StyledListComments } from './Styles';
import { increaseCmt, postsSelector } from 'features/postsSlice';
import { Stack } from '@mui/material';

const Comments = ({ postId, amountComment }) => {
  const { user } = useSelector(authSelector);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);
  const [openEditComment, setOpenEditComment] = useState(null);
  const [offset, setOffset] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const dispatch = useDispatch();

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
    dispatch(increaseCmt(postId));
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
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            openEditComment={openEditComment}
            setOpenEditComment={setOpenEditComment}
            comment={comment}
            setComments={setComments}
          />
        ))}
      </StyledListComments>

      {hasMore && comments.length < amountComment && (
        <Bottom>
          <span onClick={loadMoreCommentsHandler}>{loading ? 'Loading...' : 'Xem thêm bình luận'}</span>
          <span>
            {comments.length}/{amountComment}
          </span>
        </Bottom>
      )}
    </div>
  );
};

export default Comments;

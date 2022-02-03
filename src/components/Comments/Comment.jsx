import { Avatar } from '@mui/material';
import { authSelector } from 'features/authSlice';
import { decreaseCmt } from 'features/postsSlice';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { InputComment, More, UserImg } from '..';
import { isekaiApi } from '../../api/isekaiApi';
import styled from './Comments.module.scss';

const Comment = ({ openEditComment, setOpenEditComment, comment, setComments, postId }) => {
  const [commentTextEdit, setCommentTextEdit] = useState('');
  const [disabledButtonEdit, setDisabledButtonEdit] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  const sendEditedCommentHandler = async (commentId) => {
    if (commentTextEdit.trim().length === 0) {
      setDisabledButtonEdit(true);
      return;
    }

    setDisabledButtonEdit(false);

    setComments((prevComments) => {
      const editComments = [...prevComments];
      const comment = editComments.find((item) => item.id === commentId);
      comment.content = commentTextEdit;
      return editComments;
    });
    setOpenEditComment(false);
    setCommentTextEdit('');
    await isekaiApi.editComment(commentId, commentTextEdit);
  };

  const sendDeleteCommentHandler = async (commentId) => {
    setComments((prevComments) => {
      const editComments = [...prevComments];
      return editComments.filter((item) => item.id !== commentId);
    });
    dispatch(decreaseCmt(postId));
    await isekaiApi.deleteComment(commentId);
  };

  const changeTextInputHandler = (e) => {
    setCommentTextEdit(e.target.value);
    if (e.target.value.trim().length === 0 || e.target.value === comment.content) {
      setDisabledButtonEdit(true);
      return;
    }
    setDisabledButtonEdit(false);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const clickOpenEditHandler = (item) => () => {
    setOpenEditComment(item.id);
    setCommentTextEdit(item.content);
    handleMenuClose();
  };

  const clickRemoveHandler = (item) => () => {
    sendDeleteCommentHandler(item.id);
    handleMenuClose();
  };

  return openEditComment === comment.id ? (
    <InputComment
      key={comment.id}
      value={commentTextEdit}
      onChange={changeTextInputHandler}
      disabledBtn={disabledButtonEdit}
      onSendComment={() => {
        sendEditedCommentHandler(comment.id);
      }}
      showText={openEditComment}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          sendEditedCommentHandler(comment.id);
        }
        if (e.keyCode === 27) {
          setOpenEditComment(null);
        }
      }}
    />
  ) : (
    <div key={comment.id} className={styled.comments_item}>
      <Avatar src={comment.user.profilePicture} />
      <div className={styled.comments_main}>
        <div className={styled.info}>
          <span className={styled.name}>{comment.user.username}</span>
          <span className={styled.created_at}>{moment(comment.created_at, moment.defaultFormat).fromNow()}</span>
        </div>
        <p className={styled.content}>{comment.content}</p>
      </div>
      {comment.user.id === user.id && (
        <More
          anchorEl={anchorEl}
          open={openMenu}
          onOpenMenu={handleMenuClick}
          onCloseMenu={handleMenuClose}
          onClickOpenEdit={clickOpenEditHandler(comment)}
          onClickRemove={clickRemoveHandler(comment)}
          width="3rem"
          height="3rem"
          heightIcon="1.6rem"
          widthIcon="1.6rem"
        />
      )}
    </div>
  );
};

export default Comment;

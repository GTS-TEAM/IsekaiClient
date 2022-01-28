import moment from 'moment';
import { useState } from 'react';
import { InputComment, More, UserImg } from '..';
import { isekaiApi } from '../../api/isekaiApi';
import styled from './Comments.module.scss';

const Comment = ({ openEditComment, setOpenEditComment, item, setComments, decreaseTotalCmt, user }) => {
  const [commentTextEdit, setCommentTextEdit] = useState('');
  const [disabledButtonEdit, setDisabledButtonEdit] = useState(true);

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

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
    decreaseTotalCmt();
    await isekaiApi.deleteComment(commentId);
  };

  const changeTextInputHandler = (e) => {
    setCommentTextEdit(e.target.value);
    if (e.target.value.trim().length === 0 || e.target.value === item.content) {
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

  return openEditComment === item.id ? (
    <InputComment
      key={item.id}
      value={commentTextEdit}
      onChange={changeTextInputHandler}
      disabledBtn={disabledButtonEdit}
      onSendComment={() => {
        sendEditedCommentHandler(item.id);
      }}
      showText={openEditComment}
      onKeyDown={(e) => {
        if (e.keyCode === 13) {
          sendEditedCommentHandler(item.id);
        }
        if (e.keyCode === 27) {
          setOpenEditComment(null);
        }
      }}
    />
  ) : (
    <div key={item.id} className={styled.comments_item}>
      <UserImg userImg={item.user.profilePicture} />
      <div className={styled.comments_main}>
        <div className={styled.info}>
          <span className={styled.name}>{item.user.username}</span>
          <span className={styled.created_at}>{moment(item.created_at, moment.defaultFormat).fromNow()}</span>
        </div>
        <p className={styled.content}>{item.content}</p>
      </div>
      {item.user.id === user.id && (
        <More
          anchorEl={anchorEl}
          open={openMenu}
          onOpenMenu={handleMenuClick}
          onCloseMenu={handleMenuClose}
          onClickOpenEdit={clickOpenEditHandler(item)}
          onClickRemove={clickRemoveHandler(item)}
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

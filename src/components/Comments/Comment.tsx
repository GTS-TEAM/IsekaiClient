import { Avatar } from '@mui/material';
import InputComment from 'components/InputComment/InputComment';
import More from 'components/More/More';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isekaiApi } from '../../api/isekaiApi';
import { authSelector } from '../../features/authSlice';
import { decreaseCmt } from '../../features/postsSlice';
import { CommentType } from '../../share/types';
import { CommentMain, StyledComment } from './Styles';

interface Props {
  onRemoveComment: (commentId: string) => void;
  onEditComment: (commentId: string) => void;
  comment: CommentType;
  postId: string;
}

const Comment: React.FC<Props> = ({ comment, postId, onRemoveComment, onEditComment }) => {
  const [commentTextEdit, setCommentTextEdit] = useState('');
  const [openEditComment, setOpenEditComment] = useState<string | null>(null);
  const [disabledButtonEdit, setDisabledButtonEdit] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const dispatch = useDispatch();
  const { user } = useSelector(authSelector);

  const sendEditedCommentHandler = async (commentId: string) => {
    if (commentTextEdit.trim().length === 0) {
      setDisabledButtonEdit(true);
      return;
    }
    setDisabledButtonEdit(false);
    onEditComment(commentId);
    setOpenEditComment(null);

    comment.content = commentTextEdit;

    await isekaiApi.editComment(commentId, commentTextEdit);
    setCommentTextEdit('');
  };

  const sendDeleteCommentHandler = async (commentId: string) => {
    onRemoveComment(commentId);
    dispatch(decreaseCmt(postId));
    await isekaiApi.deleteComment(commentId);
  };

  const changeTextInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCommentTextEdit(e.currentTarget.value);
    if (e.currentTarget.value.trim().length === 0 || e.currentTarget.value === comment.content) {
      setDisabledButtonEdit(true);
      return;
    }
    setDisabledButtonEdit(false);
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const clickOpenEditHandler = (item: CommentType) => () => {
    setOpenEditComment(item.id);
    setCommentTextEdit(item.content);
    handleMenuClose();
  };

  const clickRemoveHandler = (item: CommentType) => () => {
    sendDeleteCommentHandler(item.id);
    handleMenuClose();
  };

  return openEditComment === comment.id ? (
    <InputComment
      value={commentTextEdit}
      onChange={changeTextInputHandler}
      disabledBtn={disabledButtonEdit}
      onSendComment={() => {
        sendEditedCommentHandler(comment.id);
      }}
      showText={openEditComment}
      onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
          sendEditedCommentHandler(comment.id);
        }
        if (e.key === 'Escape') {
          setOpenEditComment(null);
        }
      }}
    />
  ) : (
    <StyledComment>
      <Avatar src={comment.user.avatar} />
      <CommentMain>
        <div className="info">
          <span className="name">{comment.user.username}</span>
          <span className="created_at">{moment(comment.created_at, moment.defaultFormat).fromNow()}</span>
        </div>
        <p className="content">{comment.content}</p>
      </CommentMain>
      {user && comment.user.id === user.id && (
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
    </StyledComment>
  );
};

export default Comment;

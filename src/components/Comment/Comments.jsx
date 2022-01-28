import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InputComment, UserImg } from '..';
import { isekaiApi } from '../../api/isekaiApi';
import { authSelector } from '../../features/authSlice';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IconButton, Menu } from '@mui/material';
import styled from './Comments.module.scss';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Comments = ({ postId, increaseTotalCmt, decreaseTotalCmt }) => {
  const { user } = useSelector(authSelector);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);

  const [openEditComment, setOpenEditComment] = useState(null);

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

  useEffect(() => {
    const getCommentsPost = async () => {
      const data = await isekaiApi.getCommentsPost(postId);
      setComments(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
    };
    getCommentsPost();
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
          console.log(e.keyCode);
          if (e.keyCode === 13) {
            sendCommentHandler();
          }
          if (e.keyCode === 27) {
            setOpenEditComment(false);
          }
        }}
      />
      <div className={styled.comments_list_wrap}>
        <div className={styled.comments_list}>
          {comments.map((item) => (
            <Comment
              key={item.content}
              openEditComment={openEditComment}
              setOpenEditComment={setOpenEditComment}
              item={item}
              setComments={setComments}
              decreaseTotalCmt={decreaseTotalCmt}
              user={user}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;

function Comment({ openEditComment, setOpenEditComment, item, setComments, decreaseTotalCmt, user }) {
  const [commentTextEdit, setCommentTextEdit] = useState('');
  const [disabledButtonEdit, setDisabledButtonEdit] = useState(true);
  // EDIT COMMENT

  const style = { marginRight: 10 };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const sendEditedCommentHandler = async (commentId) => {
    console.log('clicked', commentId);

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

  //
  return openEditComment === item.id ? (
    <InputComment
      key={item.id}
      value={commentTextEdit}
      onChange={(e) => {
        setCommentTextEdit(e.target.value);
        if (e.target.value.trim().length === 0 || e.target.value === item.content) {
          setDisabledButtonEdit(true);
          return;
        }
        setDisabledButtonEdit(false);
      }}
      disabledBtn={disabledButtonEdit}
      onSendComment={() => {
        sendEditedCommentHandler(item.id);
      }}
      showText={openEditComment}
      onKeyDown={(e) => {
        console.log(e.keyCode);
        if (e.keyCode === 13) {
          sendEditedCommentHandler(item.id);
        }
        if (e.keyCode === 27) {
          setOpenEditComment(false);
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
        <div key={item.id} className={styled.comments_actions}>
          <span
            onClick={() => {
              console.log(item.content);

              setOpenEditComment(item.id);
              setCommentTextEdit(item.content);
            }}
          >
            Chỉnh sửa
          </span>
          <span
            onClick={() => {
              sendDeleteCommentHandler(item.id);
            }}
          >
            Xóa
          </span>
          <IconButton
            onClick={(e) => {
              handleMenuClick(e);
              console.log(item.content);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
          <Menu
            key={item.content}
            id={'simple-menu'}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            autoFocus={false}
          >
            <MenuItem
              onClick={() => {
                console.log(item.content);
                setOpenEditComment(item.id);
                setCommentTextEdit(item.content);
                handleMenuClose();
              }}
            >
              <EditIcon fontSize="small" style={style} />
              Chỉnh sửa {item.content}
            </MenuItem>
            <MenuItem
              onClick={() => {
                console.log(item.content);

                sendDeleteCommentHandler(item.id);
                handleMenuClose();
              }}
            >
              <DeleteIcon fontSize="small" style={style} />
              Xóa
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}

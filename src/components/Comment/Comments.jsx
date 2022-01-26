import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { InputComment, UserImg } from '..';
import { isekaiApi } from '../../api/isekaiApi';
import { authSelector } from '../../features/authSlice';
import { v4 as uuidv4 } from 'uuid';
import styled from './Comments.module.scss';

const Comments = ({ postId }) => {
  const { token, user } = useSelector(authSelector);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [disabledButton, setDisabledButton] = useState(true);

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
    const newComment = {
      content: commentText,
      created_at: new Date(),
      id: uuidv4(),
      user,
    };

    setComments([newComment, ...comments]);

    await isekaiApi.commentPost(postId, commentText, token.accessToken);

    setCommentText('');
  };

  useEffect(() => {
    const getCommentsPost = async () => {
      const data = await isekaiApi.getCommentsPost(postId, token.accessToken);
      setComments(data.sort((a, b) => b.created_at.localeCompare(a.created_at)));
    };
    getCommentsPost();
  }, [postId, token.accessToken]);

  console.log(comments);

  return (
    <div className={styled.comments}>
      <InputComment
        onChange={commentTextChangeHandler}
        onSendComment={sendCommentHandler}
        disabledBtn={disabledButton}
        value={commentText}
        className={styled.input_comments}
      />
      <div className={styled.comments_list_wrap}>
        <div className={styled.comments_list}>
          {comments.length > 0 &&
            comments.map((item) => {
              return (
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
                    <div className={styled.comments_actions}>
                      <span>Chỉnh sửa</span>
                      <span>Xóa</span>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Comments;

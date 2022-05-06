import React, { FC, FormEvent, useEffect, useState } from 'react';
import { CommentItem } from 'share/types';
import { isekaiApi } from '../../api/isekaiApi';
import Comment from './Comment';
import { Bottom, StyledComments, StyledInputComment, StyledListComments } from './Styles';

interface Props {
  postId: string;
  amountComment: number;
  onIncreaseCmt: () => void;
}

const Comments: FC<Props> = ({ postId, amountComment, onIncreaseCmt }) => {
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [commentText, setCommentText] = useState<string>('');
  const [offset, setOffset] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const commentTextChangeHandler = (e: FormEvent<HTMLInputElement>) => {
    setCommentText(e.currentTarget.value);
  };

  const sendCommentHandler = async () => {
    if (commentText.trim().length === 0) {
      return;
    }
    const { data } = await isekaiApi.commentPost(postId, commentText);
    const newComment = {
      content: data.content,
      created_at: data.created_at,
      updated_at: data.updated_at,
      id: data.id,
      user: data.user,
    };
    onIncreaseCmt();
    setComments([newComment, ...comments]);
    setCommentText('');
  };

  const loadMoreCommentsHandler = async () => {
    setLoading(true);
    const { data } = await isekaiApi.getCommentsPost(postId, offset + 1);
    setLoading(false);
    if (data.length > 0) {
      setHasMore(true);
      setOffset(offset + 1);
      setComments([...comments, ...data]);
    } else {
      setHasMore(false);
    }
  };

  const removeCommentHandler = (commentId: string) => {
    setComments((prevComments) => {
      const editComments = [...prevComments];
      return editComments.filter((item) => item.id !== commentId);
    });
  };

  const editCommentHandler = (commentId: string) => {
    setComments((prevComments) => {
      const editComments = [...prevComments];
      const comment = editComments.find((item) => item.id === commentId);
      if (comment) {
        comment.content = commentText;
      }
      return editComments;
    });
  };

  const pressKeyboardHander = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendCommentHandler();
    }
    if (e.key === 'Escape') {
      setCommentText('');
    }
  };

  useEffect(() => {
    let isActive = true; // component mounted
    const getCommentsPost = async () => {
      const { data } = await isekaiApi.getCommentsPost(postId, 1);
      if (isActive) {
        if (data.length > 0) {
          setHasMore(true);
        } else {
          setHasMore(false);
        }
        const commentsSorted: CommentItem[] = data.sort((a, b) => b.created_at.localeCompare(a.created_at));
        setComments(commentsSorted);
      }
    };

    getCommentsPost();

    return () => {
      isActive = false;
    };
  }, [postId]);

  return (
    <StyledComments>
      <StyledInputComment
        onChange={commentTextChangeHandler}
        onSendComment={sendCommentHandler}
        disabledBtn={commentText.trim().length === 0}
        value={commentText}
        onKeyDown={pressKeyboardHander}
      />
      {comments.length > 0 && (
        <StyledListComments>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              postId={postId}
              onEditComment={editCommentHandler}
              onRemoveComment={removeCommentHandler}
            />
          ))}
        </StyledListComments>
      )}

      {hasMore && comments.length < amountComment && (
        <Bottom>
          <span onClick={loadMoreCommentsHandler}>{loading ? 'Loading...' : 'Xem thêm bình luận'}</span>
          <span>
            {comments.length}/{amountComment}
          </span>
        </Bottom>
      )}
    </StyledComments>
  );
};

export default Comments;

import { ModalViewPost } from 'components';
import { openViewPost, setPostIdView, uiSelector } from 'features/uiSlice';
import { useOverFlowHidden } from 'hooks/useOverFlowHidden';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactGridFacebook from '../ReactGridFacebook/ReactGridFacebook';
const GridImg = ({ post, decreaseTotalCmt, increaseTotalCmt, onLike, isLiked, totalComment, totalLike }) => {
  const ui = useSelector(uiSelector);
  const dispatch = useDispatch();
  const [slideIndex, setSlideIndex] = useState(0);

  const clickImgHandler = ({ index }) => {
    dispatch(setPostIdView(post.id));
    dispatch(openViewPost());
    setSlideIndex(index);
  };

  useOverFlowHidden(ui.createPostModal.isOpenViewPost);

  return (
    <div>
      <ReactGridFacebook images={post.image} hideOverlay={true} onClickEach={clickImgHandler} />
      {post.id === ui.createPostModal.idPost && ui.createPostModal.isOpenViewPost && (
        <ModalViewPost
          post={post}
          decreaseTotalCmt={decreaseTotalCmt}
          increaseTotalCmt={increaseTotalCmt}
          onLike={onLike}
          isLiked={isLiked}
          totalComment={totalComment}
          totalLike={totalLike}
          slideIndex={slideIndex}
        />
      )}
    </div>
  );
};

export default GridImg;

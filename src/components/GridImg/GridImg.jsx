import { uiSelector } from 'features/uiSlice';
import { useOverFlowHidden } from 'hooks/useOverFlowHidden';
import React from 'react';
import { useSelector } from 'react-redux';
import { createSearchParams, useNavigate } from 'react-router-dom';
import ReactGridFacebook from '../ReactGridFacebook/ReactGridFacebook';
const GridImg = ({ post }) => {
  const ui = useSelector(uiSelector);
  const navigate = useNavigate();

  const clickImgHandler = ({ index }) => {
    navigate({
      pathname: '/post',
      search: `?${createSearchParams({
        id: post.id,
        index,
      })}`,
    });
  };

  useOverFlowHidden(ui.createPostModal.isOpenViewPost);

  return (
    <div>
      <ReactGridFacebook images={post.image} hideOverlay={true} onClickEach={clickImgHandler} />
    </div>
  );
};

export default GridImg;

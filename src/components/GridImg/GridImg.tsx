import { uiSelector } from 'features/uiSlice';
import { useAppSelector } from 'hooks/hooks';
import { useOverFlowHidden } from 'hooks/useOverFlowHidden';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostItem } from 'share/types';
import ReactGridFacebook from '../ReactGridFacebook/ReactGridFacebook';

interface Props {
  post: PostItem;
}

const GridImg: React.FC<Props> = ({ post }) => {
  const { modalPost: uiModalPost } = useAppSelector(uiSelector);
  const navigate = useNavigate();

  const clickImgHandler = (d: { index: number }) => {
    navigate({
      pathname: '/post',
      search: `?id=${post.id}&index=${d.index}`,
    });
  };

  useOverFlowHidden(uiModalPost.isOpenViewPost);

  return (
    <div>
      <ReactGridFacebook images={post.image} hideOverlay={true} onClickEach={clickImgHandler} />
    </div>
  );
};

export default GridImg;

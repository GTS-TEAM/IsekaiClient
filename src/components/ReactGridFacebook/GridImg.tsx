import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostItem } from 'share/types';
import ReactGridFacebook from './ReactGridFacebook';

interface Props {
  post: PostItem;
}

const GridImg: React.FC<Props> = ({ post }) => {
  const navigate = useNavigate();

  const clickImgHandler = (d: { index: number }) => {
    navigate({
      pathname: '/post',
      search: `?id=${post.id}&index=${d.index}`,
    });
  };

  return (
    <div>
      <ReactGridFacebook images={post.image} hideOverlay={true} onClickEach={clickImgHandler} />
    </div>
  );
};

export default GridImg;

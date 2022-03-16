import { Typography } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import PropTypes from 'prop-types'; // ES6
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { convertResPhotos } from 'utils/convertResPhotos';
import { HeaderPhotosPreview, ImgPreview, ImgPreviewList, StyledPhotosPreview } from './Styles';

interface Props {
  userId: string;
}

interface PhotoPreviewType {
  postId: string;
  id: string;
  url: string;
  indexImg: number;
}

const PhotosPreview: React.FC<Props> = ({ userId }) => {
  const [photosPreview, setPhotosPreview] = useState<PhotoPreviewType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPhotosPreview = async () => {
      const { data } = await isekaiApi.getPostPhoto(userId, 'photo');
      const newData = convertResPhotos(data);
      setPhotosPreview(newData);
    };

    getPhotosPreview();

    return () => {};
  }, [userId]);

  const clickImgHandler = (idPost: string, indexImg: number) => () => {
    navigate(`/post?id=${idPost}&index=${indexImg}`);
  };

  return (
    <StyledPhotosPreview>
      <HeaderPhotosPreview>
        <Link to={'photos'}>
          <Typography variant="h4" fontWeight={500} sx={{ color: 'var(--fds-black-1)' }}>
            Ảnh
          </Typography>
        </Link>
      </HeaderPhotosPreview>
      <ImgPreviewList>
        {photosPreview.map((img) => (
          <ImgPreview key={img.id} onClick={clickImgHandler(img.postId, img.indexImg)}>
            <img src={img.url} alt="" />
          </ImgPreview>
        ))}
      </ImgPreviewList>
    </StyledPhotosPreview>
  );
};

PhotosPreview.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default PhotosPreview;

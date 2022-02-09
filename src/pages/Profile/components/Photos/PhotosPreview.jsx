import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; // ES6
import { HeaderPhotosPreview, ImgPreview, ImgPreviewList, StyledPhotosPreview } from './Styles';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { isekaiApi } from 'api/isekaiApi';
import { convertResPhotos } from 'utils/convertResPhotos';

const PhotosPreview = ({ userId }) => {
  const [photosPreview, setPhotosPreview] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getPhotosPreview = async () => {
      const data = await isekaiApi.getPostPhoto(userId, 'photo');
      const newData = convertResPhotos(data);
      setPhotosPreview(newData);
    };

    getPhotosPreview();

    return () => {};
  }, [userId]);

  const clickImgHandler = (idPost, indexImg) => () => {
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

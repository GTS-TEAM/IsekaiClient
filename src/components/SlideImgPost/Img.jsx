import React from 'react';
import useColorThief from 'use-color-thief';
import { StyledImg } from './Styles';
const Img = ({ imgUrl }) => {
  const { color } = useColorThief(imgUrl, {
    format: 'hex',
    colorCount: 10,
    quality: 10,
  });
  return (
    <StyledImg>
      <div className="bg-blur" style={{ backgroundColor: color }}></div>
      <img src={imgUrl} alt="" />
    </StyledImg>
  );
};

export default Img;

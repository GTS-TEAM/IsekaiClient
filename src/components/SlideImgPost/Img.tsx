import React from 'react';
import useColorThief from 'use-color-thief';
import { StyledImg } from './Styles';

interface Props {
  imgUrl: string;
}

const Img: React.FC<Props> = ({ imgUrl }) => {
  const { color } = useColorThief(imgUrl, {
    format: 'hex',
  });

  console.log(color);
  return (
    <StyledImg backgroundColor={color}>
      <div className="bg-blur"></div>
      <img src={imgUrl} alt="" />
    </StyledImg>
  );
};

export default Img;

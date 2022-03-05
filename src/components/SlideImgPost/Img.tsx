import React from 'react';
import useColorThief from 'use-color-thief';
import { StyledImg } from './Styles';

interface Props {
  imgUrl: string;
}

enum FormatString {
  hex = 'hex',
  rgb = 'rgb',
}

const Img: React.FC<Props> = ({ imgUrl }) => {
  const { color } = useColorThief(imgUrl, {
    format: FormatString.hex,
  });

  return (
    <StyledImg backgroundColor={color}>
      <div className="bg-blur"></div>
      <img src={imgUrl} alt="" />
    </StyledImg>
  );
};

export default Img;

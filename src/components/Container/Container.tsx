import React from 'react';
import { StyledContainer } from './Styles';

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const Container: React.FC<Props> = ({ children, className, style }) => {
  return (
    <StyledContainer className={className} style={style}>
      {children}
    </StyledContainer>
  );
};

export default Container;

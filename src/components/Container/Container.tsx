import React from 'react';
import { StyledContainer } from './Styles';

const Container: React.FC = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;

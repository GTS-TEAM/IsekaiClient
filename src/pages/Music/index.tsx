import React from 'react';
import Control from './components/Control';
import Header from './components/Header';
import ListMusic from './components/ListMusic';
import { StyledMusic } from './styles';

const Music = () => {
  return (
    <StyledMusic>
      <Header />
      <ListMusic />
      <Control />
    </StyledMusic>
  );
};

export default Music;

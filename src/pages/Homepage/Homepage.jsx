import React from 'react';
import { CreatePost } from './components';
import styled from './Homepage.module.scss';

const Homepage = () => {
  return (
    <div className={styled.homepage}>
      <div className={styled.feed}>
        <CreatePost />
      </div>
    </div>
  );
};

export default Homepage;

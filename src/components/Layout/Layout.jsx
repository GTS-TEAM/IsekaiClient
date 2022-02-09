import React from 'react';
import { Header } from '..';
import styled from './Layout.module.scss';

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main className={styled.main}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;

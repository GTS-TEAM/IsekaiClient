import Header from 'components/Header/Header';
import React from 'react';
import styled from './Layout.module.scss';

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <main className={styled.main}>{children}</main>
    </React.Fragment>
  );
};

export default Layout;

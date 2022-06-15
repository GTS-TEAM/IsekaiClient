import Header from 'components/Header/Header';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  );
};

export default Layout;

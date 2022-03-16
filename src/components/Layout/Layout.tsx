import Header from 'components/Header/Header';
import React from 'react';

const Layout: React.FC = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      <>{children}</>
    </React.Fragment>
  );
};

export default Layout;

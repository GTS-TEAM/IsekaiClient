import Header from 'components/Header/Header';
import React from 'react';
import { Main } from './Styles';

interface Props {
  sx?: React.CSSProperties;
  className?: string;
}

const Layout: React.FC<Props> = ({ children, className, sx }) => {
  return (
    <React.Fragment>
      <Header />
      <Main className={className} style={sx}>
        {children}
      </Main>
    </React.Fragment>
  );
};

export default Layout;

import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { StyledHeader } from './Styles';
interface Props {
  title: string;
  path?: string;
}

const Header: React.FC<Props> = ({ title, path }) => {
  return (
    <StyledHeader>
      <h3>{title}</h3>
      {path && (
        <Link to={path as string}>
          <Button>Xem tất cả</Button>
        </Link>
      )}
    </StyledHeader>
  );
};

export default Header;

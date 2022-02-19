import { Button } from '@mui/material';
import React from 'react';
import { BiSearch } from 'react-icons/bi';
import { InputSearch, StyledHeader } from './Styles';

const Header = () => {
  return (
    <StyledHeader>
      <InputSearch>
        <BiSearch />
        <input type="text" placeholder="Tìm kiếm..." />
        <Button>
          <BiSearch />
        </Button>
      </InputSearch>
    </StyledHeader>
  );
};

export default Header;

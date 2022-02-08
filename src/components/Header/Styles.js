import styled from '@emotion/styled';
import { Menu, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export const StyledHeader = styled.header`
  height: var(--headerHeight);
  background-color: var(--fds-white);
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 101;
`;

export const HeaderWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  column-gap: 1.6rem;
  width: 100%;
`;

export const Logo = styled.div`
  font-family: 'Poppins';

  a {
    font-size: 3.2rem;
    color: var(--mainColor);
    font-weight: 700;
  }

  .small {
    display: none;
    font-size: 3rem;
    width: 5rem;
    height: 5rem;
    align-items: center;
    justify-content: center;
    background-color: #f8f3fb;
    border-radius: var(--borderRadius3);
  }

  @media screen and (max-width: 767px) {
    width: 7.6rem;

    .small {
      display: flex;
    }

    .large {
      display: none;
    }
  }
`;

export const SearchGlobal = styled.div`
  width: 100%;
  max-width: 32rem;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  background: var(--fds-gray-6);
  border-radius: var(--borderRadius3);
  column-gap: 1rem;
  border: 1px solid;
  border-color: var(--fds-gray-6);
  justify-self: center;
  transition: all 0.3s;

  input {
    background-color: transparent;
    flex: 1;
    width: 100%;
    color: var(--fds-gray-8);

    &::placeholder {
      color: var(--fds-gray-11);
      font-weight: 400;
    }
  }

  svg {
    color: var(--fds-gray-11);
    width: 2.4rem;
    height: 2.4rem;
  }
`;

export const Navbar = styled(Stack)`
  flex-direction: row;
  align-items: center;
  column-gap: 1.2rem;
`;

export const NavItem = styled.div`
  width: 3.8rem;
  height: 3.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--fds-gray-10);
  cursor: pointer;

  a {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: inherit;
  }

  a.active {
    background-color: var(--mainColor);
    color: var(--fds-white);
    box-shadow: 0 14px 26px -12px rgb(85 150 230 / 42%), 0 4px 23px 0px rgb(0 0 0 / 12%),
      0 8px 10px -5px rgb(85 150 230 / 20%);
    border-radius: 8px;
    overflow: hidden;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

export const User = styled.div`
  display: flex;
  align-items: center;
  background-color: transparent;
  color: var(--textColorGray);
  cursor: pointer;

  span {
    min-width: 10rem;
    display: block;
    text-align: center;
  }

  span {
    @media screen and (max-width: 1023px) {
      display: none;
    }
  }
`;

export const DropdownMenu = styled(Menu)`
  .MuiPaper-root {
    width: 100%;
    max-width: 36rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    padding: 0.8rem;
    border-radius: var(--borderRadius3);
    margin-top: 1rem;
  }

  .MuiList-root {
    padding: 0;
  }

  .MuiMenuItem-root {
    column-gap: 1rem;
    padding: 0.8rem;
    border-radius: var(--borderRadius3);

    .icon {
      width: 3.6rem;
      height: 3.6rem;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--textColorBlack);
      border-radius: 50%;
      background-color: #e4e6eb;

      svg {
        width: 1.6rem;
        height: 1.6rem;
      }
    }

    .text {
      display: flex;
      flex-direction: column;
      color: var(--textColorGray);
      font-size: 1.3rem;
    }

    .text-1 {
      color: var(--textColorGray);
      font-size: 1.4rem;
      font-weight: 600;
    }

    .text .name {
      font-weight: 600;
      font-size: 1.6rem;
    }
  }

  .dropdown-header {
    padding-bottom: 0.8rem;
    border-bottom: 1px solid var(--borderColor);
  }

  .dropdown-list {
    padding-top: 0.8rem;
  }
`;

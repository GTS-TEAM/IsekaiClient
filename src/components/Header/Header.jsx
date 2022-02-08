import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logout } from '../../features/authSlice';
import { DropdownMenu, HeaderWrap, Logo, Navbar, NavItem, SearchGlobal, StyledHeader, User } from './Styles';
import { Avatar, MenuItem, Stack } from '@mui/material';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import { deleteTokenFromLocalStorage } from '../../api/axoisClient';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
const Header = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { user } = useSelector(authSelector);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickOpenDropdown = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const clickLogoutHandler = () => {
    dispatch(logout());
    handleCloseDropdown();
    deleteTokenFromLocalStorage();
  };

  const clickGoToProfileUser = () => {
    navigate(`/profile/${user.id}`);
  };

  const focusHandler = () => {
    setIsFocus(true);
  };

  const blurHandler = () => {
    setIsFocus(false);
  };

  return (
    <StyledHeader>
      <HeaderWrap>
        <Stack direction="row" alignItems="center" columnGap="4.8rem">
          <Logo>
            <Link to="/home" className="large">
              ISEKAI
            </Link>
            <Link to="/home" className="small">
              IK
            </Link>
          </Logo>
          <Navbar>
            <NavItem>
              <NavLink to="/home">
                <AiOutlineHome />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/friends">
                <FiUsers />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/message">
                <AiOutlineMessage />
              </NavLink>
            </NavItem>
            <NavItem>
              <IoNotificationsOutline />
            </NavItem>
          </Navbar>
        </Stack>
        <Stack direction="row" alignItems="center" columnGap="1.2rem">
          <SearchGlobal
            style={
              isFocus
                ? {
                    background: 'var(--fds-white)',
                    boxShadow: ' -1px 3px 10px 0 rgb(0 0 0 / 6%) !important',
                    borderColor: ' #e3e3e3',
                  }
                : null
            }
          >
            <BiSearch />
            <input type="text" placeholder="Search" onFocus={focusHandler} onBlur={blurHandler} />
          </SearchGlobal>
          <User onClick={handleClickOpenDropdown}>
            <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
            <span>{user.username}</span>
          </User>
        </Stack>
        <DropdownMenu anchorEl={anchorEl} open={open} onClose={handleCloseDropdown}>
          <div className="dropdown-header">
            <MenuItem onClick={clickGoToProfileUser}>
              <Avatar src={user.avatar} sx={{ width: 64, height: 64 }} />
              <div className="text">
                <span className="name">{user.username}</span>
                <span>Xem trang cá nhân của bạn</span>
              </div>
            </MenuItem>
          </div>
          <div className="dropdown-list">
            <MenuItem onClick={clickLogoutHandler}>
              <div className="icon">
                <FiLogOut />
              </div>
              <span className="text-1">Log out</span>
            </MenuItem>
          </div>
        </DropdownMenu>
      </HeaderWrap>
    </StyledHeader>
  );
};

export default Header;

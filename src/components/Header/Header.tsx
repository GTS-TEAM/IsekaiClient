import { Avatar, MenuItem, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React, { useState } from 'react';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { deleteTokenFromLocalStorage } from '../../api/axoisClient';
import { authSelector, logout } from '../../features/authSlice';
import { DropdownMenu, HeaderWrap, Logo, Navbar, NavItem, SearchGlobal, StyledHeader, User } from './Styles';
const Header = () => {
  const [isFocus, setIsFocus] = useState(false);
  const { user } = useAppSelector(authSelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClickOpenDropdown = (event: React.MouseEvent<HTMLDivElement>) => {
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
    navigate(`/profile/${user?.id}`);
  };

  const clickGoToSettingHandler = () => {
    navigate(`/setting`);
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
                : undefined
            }
          >
            <BiSearch />
            <input type="text" placeholder="Search" onFocus={focusHandler} onBlur={blurHandler} />
          </SearchGlobal>
          <User onClick={handleClickOpenDropdown}>
            <Avatar src={user?.avatar} sx={{ width: 40, height: 40 }} />
          </User>
        </Stack>
        <DropdownMenu anchorEl={anchorEl} open={open} onClose={handleCloseDropdown}>
          <div className="dropdown-header">
            <MenuItem onClick={clickGoToProfileUser}>
              <Avatar src={user?.avatar} sx={{ width: 64, height: 64 }} />
              <div className="text">
                <span className="name">{user?.username}</span>
                <span>Xem trang cá nhân của bạn</span>
              </div>
            </MenuItem>
          </div>
          <div className="dropdown-list">
            <MenuItem onClick={clickGoToSettingHandler}>
              <div className="icon">
                <IoSettingsOutline />
              </div>
              <span className="text-1">Cài đặt</span>
            </MenuItem>
            <MenuItem onClick={clickLogoutHandler}>
              <div className="icon">
                <FiLogOut />
              </div>
              <span className="text-1">Đăng xuất</span>
            </MenuItem>
          </div>
        </DropdownMenu>
      </HeaderWrap>
    </StyledHeader>
  );
};

export default Header;
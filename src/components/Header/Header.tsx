import { Avatar, MenuItem, Stack } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { deleteTokenFromLocalStorage } from '../../api/axoisClient';
import { authSelector, logout } from '../../features/authSlice';
import GlobalSearch from './GlobalSearch';
import { DropdownMenu, HeaderWrap, Logo, Navbar, NavItem, StyledHeader, User } from './Styles';
import { useGoogleLogout } from 'react-google-login';
import { clientId } from 'share/types';

const Header = () => {
  const { user } = useAppSelector(authSelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //sigout if login with google
  const { signOut } = useGoogleLogout({
    clientId,
  });

  const handleClickOpenDropdown = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseDropdown = () => {
    setAnchorEl(null);
  };

  const clickLogoutHandler = () => {
    signOut();
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
          <GlobalSearch />
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

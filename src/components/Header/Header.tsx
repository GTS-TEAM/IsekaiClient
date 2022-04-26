import { Avatar, Badge, MenuItem, Stack } from '@mui/material';
import { getAllNotifycation, notifySelector, readNotifycation } from 'features/notifySlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import { AiOutlineHome, AiOutlineMessage } from 'react-icons/ai';
import { BiHeart } from 'react-icons/bi';
import { FiLogOut, FiUsers } from 'react-icons/fi';
import { IoNotificationsOutline, IoSettingsOutline } from 'react-icons/io5';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { clientId, notifyItem } from 'share/types';
import { deleteTokenFromLocalStorage } from '../../api/axoisClient';
import { authSelector, logout } from '../../features/authSlice';
import GlobalSearch from './GlobalSearch';
import { DropdownMenu, HeaderWrap, Logo, Navbar, NavItem, Notifycation, StyledHeader, User } from './Styles';

const Header = () => {
  const { user } = useAppSelector(authSelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isDropDown, setIsDropDown] = React.useState(false);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const notify = useAppSelector(notifySelector);

  React.useEffect(() => {
    dispatch(getAllNotifycation());
  }, [dispatch]);
  const { signOut } = useGoogleLogout({
    clientId,
  });

  const getTotalItem = (items: notifyItem[]) => {
    let total = 0;
    items.forEach((i) => {
      if (!i.is_read) {
        total++;
      }
    });
    return total;
  };

  const clickReadNotification = (id: string) => {
    dispatch(readNotifycation(id));
  };

  const handleClickOpenDropdown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDropDown(false);
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

  const clickShowContentNotifycation = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsDropDown(true);
    setAnchorEl(event.currentTarget);
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
              <NavLink to={'/message'}>
                <AiOutlineMessage />
              </NavLink>
            </NavItem>
            <NavItem onClick={clickShowContentNotifycation}>
              <Badge badgeContent={getTotalItem(notify.notifyItem)} color="error">
                <IoNotificationsOutline />
              </Badge>
            </NavItem>
          </Navbar>
        </Stack>
        <Stack direction="row" alignItems="center" columnGap="1.2rem">
          <GlobalSearch />
          <User onClick={handleClickOpenDropdown}>
            <Avatar src={user?.avatar} sx={{ width: 40, height: 40 }} />
          </User>
        </Stack>
        <DropdownMenu
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseDropdown}
          isDropDown={isDropDown}
          sx={{ left: `${isDropDown ? '-4rem' : ''}` }}
        >
          {isDropDown ? (
            <>
              <Notifycation length={notify.notifyItem.length}>
                <div className="top">
                  <span className="title">Thông báo</span>
                  <IoNotificationsOutline className="icon" />
                </div>
                {notify.notifyItem.length === 0 && <h3>Hiện tại chưa có thông báo dành cho bạn !</h3>}
                {notify.notifyItem.map((notif) => (
                  <li id={notif.id} style={{ backgroundColor: `${notif.is_read ? 'white' : '#cbf4f5'}` }}>
                    <Link className="link" to={notif.ref_url} onClick={() => clickReadNotification(notif.id)}>
                      <div className="left">
                        <Avatar src={notif.avatar} sx={{ width: 40, height: 40 }} />
                        <div className="middle">
                          <span className="span-content">{notif.content}</span>
                          <span>30 phút trước</span>
                        </div>
                      </div>
                    </Link>
                    <BiHeart className="icon" />
                  </li>
                ))}
              </Notifycation>
            </>
          ) : (
            <>
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
            </>
          )}
        </DropdownMenu>
      </HeaderWrap>
    </StyledHeader>
  );
};

export default React.memo(Header);

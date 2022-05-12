import { Avatar, Badge, MenuItem, Stack } from '@mui/material';
import { getAllNotifycation, notifySelector, readNotifycation } from 'features/notifySlice';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import moment from 'moment';
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
import {
  DropdownMenu,
  HeaderWrap,
  Logo,
  Navbar,
  NavItem,
  StyledHeader,
  StyledNotification,
  StyledNotificationItem,
  User,
} from './Styles';

const Header = () => {
  const { user } = useAppSelector(authSelector);
  const [menuEl, setMenuEl] = React.useState<null | HTMLDivElement>(null);
  const [notificationEl, setNotificationEl] = React.useState<null | HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notifyItem: notifies } = useAppSelector(notifySelector);

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

  const handleCloseDropdown = () => {
    setMenuEl(null);
  };

  const clickLogoutHandler = () => {
    signOut();
    dispatch(logout());
    handleCloseDropdown();
    deleteTokenFromLocalStorage();
  };

  React.useEffect(() => {
    dispatch(getAllNotifycation());
  }, [dispatch]);

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
            <NavItem
              onClick={(e) => {
                setNotificationEl(e.currentTarget);
              }}
            >
              <Badge badgeContent={getTotalItem(notifies)} color="error">
                <IoNotificationsOutline />
              </Badge>
            </NavItem>
          </Navbar>
        </Stack>
        <Stack direction="row" alignItems="center" columnGap="1.2rem">
          <GlobalSearch />
          <User
            onClick={(e) => {
              setMenuEl(e.currentTarget);
            }}
          >
            <Avatar src={user?.avatar} sx={{ width: 40, height: 40 }} />
          </User>
        </Stack>
        <DropdownMenu
          anchorEl={menuEl}
          open={Boolean(menuEl)}
          onClose={() => {
            setMenuEl(null);
          }}
        >
          <div className="dropdown-header">
            <MenuItem
              onClick={() => {
                navigate(`/profile/${user?.id}`);
              }}
            >
              <Avatar src={user?.avatar} sx={{ width: 64, height: 64 }} />
              <div className="text">
                <span className="name">{user?.username}</span>
                <span>Xem trang cá nhân của bạn</span>
              </div>
            </MenuItem>
          </div>
          <div className="dropdown-list">
            <MenuItem
              onClick={() => {
                navigate(`/setting`);
              }}
            >
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
        <StyledNotification
          open={Boolean(notificationEl)}
          anchorEl={notificationEl}
          onClose={() => {
            setNotificationEl(null);
          }}
          anchorOrigin={{
            horizontal: 'center',
            vertical: 'bottom',
          }}
        >
          <div className="header">
            <span>Notifications</span>
          </div>
          {notifies.length > 0 ? (
            <ul className="list">
              {notifies.map((nofi) => {
                return (
                  <li
                    onClick={() => {
                      clickReadNotification(nofi.id);
                    }}
                  >
                    <Link className="link" to={nofi.ref_url}>
                      <StyledNotificationItem>
                        <div className="content">
                          <Avatar
                            src="https://friendkit.cssninja.io/assets/img/avatars/dan.jpg"
                            alt="Hi"
                            sx={{ width: 40, height: 40 }}
                          />
                          <div className="main-content">
                            <span className="text">{nofi.content}</span>
                            <span className="time">{moment(nofi.updated_at, moment.defaultFormat).fromNow()}</span>
                          </div>
                        </div>
                        <div className="icon">
                          <BiHeart />
                        </div>
                      </StyledNotificationItem>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="no-data">Không có dữ liệu</p>
          )}
        </StyledNotification>
      </HeaderWrap>
    </StyledHeader>
  );
};

export default React.memo(Header);

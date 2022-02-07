import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import styled from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector, logout } from '../../features/authSlice';
import { DropdownMenu } from './Styles';
import { Avatar, MenuItem } from '@mui/material';
import { FiLogOut } from 'react-icons/fi';
import { deleteTokenFromLocalStorage } from '../../api/axoisClient';
const Header = () => {
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

  return (
    <header className={styled.header}>
      <div className={styled.container}>
        <div className={styled.logo}>
          <Link to="/home" className={styled.logo__large}>
            ISEKAI
          </Link>
          <Link to="/home" className={styled.logo__small}>
            IK
          </Link>
        </div>
        <div className={styled.search__container}>
          <BiSearch />
          <input type="text" placeholder="Search" />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div className={styled.notification}>
            <button className={styled.notification__btn}>
              <IoNotificationsOutline />
              <div className={styled.notification__amount}>1</div>
            </button>
          </div>
          <div className={styled.user}>
            <button className={styled.user__btn} onClick={handleClickOpenDropdown}>
              <Avatar src={user.avatar} sx={{ width: 40, height: 40 }} />
              <span className={styled.user__name}>{user.username}</span>
            </button>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

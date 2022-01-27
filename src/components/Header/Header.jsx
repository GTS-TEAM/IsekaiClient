import React from 'react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import styled from './Header.module.scss';
import { useSelector } from 'react-redux';
import { UserImg } from '..';
import { authSelector } from '../../features/authSlice';

const Header = () => {
  const { user } = useSelector(authSelector);

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
            <button className={styled.user__btn}>
              <UserImg userImg={user.profilePicture} />
              <span className={styled.user__name}>{user.username}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

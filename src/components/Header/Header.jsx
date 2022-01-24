import React from 'react';
import { Link } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';
import styled from './Header.module.scss';

const Header = () => {
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
              <img
                src="https://st.quantrimang.com/photos/image/2021/05/21/AVT-Doi-Anime-12.jpg"
                alt=""
                className={styled.user__img}
              />
              <span className={styled.user__name}>Hoang Huy</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

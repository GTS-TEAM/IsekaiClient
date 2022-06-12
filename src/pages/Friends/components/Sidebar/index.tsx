import React from 'react';
import { AiOutlineUser, AiOutlineUsergroupAdd, AiOutlineUserSwitch } from 'react-icons/ai';
import { FiUsers } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { StyledSidebar } from './styles';

const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <StyledSidebar className="fr-sidebar">
      <ul>
        <li>
          <NavLink to="/friends" className={location.pathname === '/friends' ? 'is-active' : undefined}>
            <AiOutlineUser />
            <span> Trang chủ</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/friends/request" className={location.pathname === '/friends/request' ? 'is-active' : undefined}>
            <AiOutlineUsergroupAdd />
            <span>Lời mời kết bạn</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/friends/suggest" className={location.pathname === '/friends/suggest' ? 'is-active' : undefined}>
            <AiOutlineUserSwitch />
            <span>Gợi ý</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/friends/all-friends"
            className={location.pathname === '/friends/all-friends' ? 'is-active' : undefined}
          >
            <FiUsers />
            <span>Tất cả bạn bè</span>
          </NavLink>
        </li>
      </ul>
    </StyledSidebar>
  );
};

export default Sidebar;

import React from 'react';
import styled from './Sidebar.module.scss';
import { AiFillHome, AiFillMessage } from 'react-icons/ai';
import { TiGroup } from 'react-icons/ti';
import { FaHeadphones } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
const sidebars = [
  {
    name: 'Home',
    path: '/home',
    icon: AiFillHome,
  },
  {
    name: 'Friends',
    path: '/friends',
    icon: TiGroup,
  },
  {
    name: 'Message',
    path: '/message',
    icon: AiFillMessage,
  },
  {
    name: 'Music',
    path: '/music',
    icon: FaHeadphones,
  },
];

const Sidebar = () => {
  return (
    <aside className={styled.sidebar}>
      <ul className={styled.sidebar__list}>
        {sidebars.map((item) => (
          <li key={item.name}>
            <NavLink
              to={item.path}
              className={(props) => (props.isActive ? `${styled.active} ${styled.sidebar__link}` : styled.sidebar__link)}
            >
              <item.icon />
              <span>{item.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

import React from 'react';
import { createPortal } from 'react-dom';
import { IoIosClose } from 'react-icons/io';
import { Link } from 'react-router-dom';
import './Sidebar.scss';
const sidebar = document.querySelector('#sidebar');
const Sidebar = ({ onClose, active }) => {
  return createPortal(
    <div className={`sidebar ${active ? 'active' : ''}`}>
      <ul className="sidebar__list">
        <li>
          <Link to="/about" className="sidebar__link">
            About us
          </Link>
        </li>
        <li>
          <Link to="/contact" className="sidebar__link">
            Contact
          </Link>
        </li>
        <li>
          <Link to="/login" className="sidebar__link">
            Login
          </Link>
        </li>
        <li>
          <Link to="/register" className="sidebar__link">
            Register
          </Link>
        </li>
      </ul>
      <div className="sidebar__close" onClick={onClose}>
        <IoIosClose />
      </div>
    </div>,
    sidebar
  );
};

export default Sidebar;

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosMenu } from 'react-icons/io';
import './Header.scss';
import { useOverFlowHidden } from '../../../../hooks/useOverFlowHidden';
import { Overlay } from '../../../../components';
import { Sidebar } from '..';

const Header = () => {
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [activeBgHeader, setActiveBgHeader] = useState(false);

  const clickOpenSidebarHandler = () => {
    setActiveSidebar(true);
  };

  const clickCloseSidebarHandler = () => {
    setActiveSidebar(false);
  };

  useOverFlowHidden(activeSidebar);

  useEffect(() => {
    const scrollHandler = (e) => {
      if (window.scrollY > 90) {
        setActiveBgHeader(true);
      } else {
        setActiveBgHeader(false);
      }
    };
    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  return (
    <header className={`header-landing ${activeBgHeader ? 'active' : ''}`}>
      <div className="header-landing__container">
        <Link to="/" className="header-landing__logo header-landing__link">
          isekai
        </Link>
        <nav className="header-landing__nav">
          <div className="nav__col">
            <Link to="about" className="header-landing__link">
              About us
            </Link>
            <Link to="contact" className="header-landing__link">
              Contact
            </Link>
          </div>
          <div className="nav__col">
            <Link to="/login" className="header-landing__link">
              Login
            </Link>
            <Link to="/register" className="header-landing__link">
              Register
            </Link>
          </div>
        </nav>
        <div className="header-landing__toggle" onClick={clickOpenSidebarHandler}>
          <IoIosMenu />
        </div>
      </div>
      {activeSidebar && <Overlay onClose={clickCloseSidebarHandler} />}
      <Sidebar onClose={clickCloseSidebarHandler} active={activeSidebar} />
    </header>
  );
};

export default Header;

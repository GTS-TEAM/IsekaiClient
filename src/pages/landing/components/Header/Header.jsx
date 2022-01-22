import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosClose, IoIosMenu } from 'react-icons/io';
import './Header.scss';
import { useOverFlowHidden } from '../../../../hooks/useOverFlowHidden';

const Header = () => {
  const [activeNav, setActiveNav] = useState(false);
  const [activeBgHeader, setActiveBgHeader] = useState(false);

  const clickOpenNavHandler = () => {
    setActiveNav(true);
  };

  const clickCloseNavHandler = () => {
    setActiveNav(false);
  };

  useOverFlowHidden(activeNav);

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
    <header className={`header ${activeBgHeader ? 'active' : ''}`}>
      <div className="header__container">
        <Link to="/" className="header__logo header__link">
          isekai
        </Link>
        <nav className={`header__nav ${activeNav ? 'active' : ''}`}>
          <div className="nav__col">
            <Link to="about" className="header__link">
              About us
            </Link>
            <Link to="about" className="header__link">
              Contact
            </Link>
          </div>
          <div className="nav__col">
            <Link to="/login" className="header__link">
              Login
            </Link>
            <Link to="/register" className="header__link">
              Register
            </Link>
          </div>
          <div className="nav__close" onClick={clickCloseNavHandler}>
            <IoIosClose />
          </div>
        </nav>
        <div className="header__toggle" onClick={clickOpenNavHandler}>
          <IoIosMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;

import React from 'react';
import { createPortal } from 'react-dom';

import { StyledModal } from './Styles';
const modal = document.querySelector('#modal');

const dropIn = {
  hidden: {
    y: '-100vh',
    x: '-50%',
    opacity: 0,
  },
  show: {
    y: '-50%',
    x: '-50%',
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    y: '100vh',
    x: '-50%',
    opacity: 0,
  },
};

const Modal = ({ children, className = '', style }) => {
  return createPortal(
    <StyledModal className={className} variants={dropIn} initial="hidden" animate="show" exit="exit">
      {children}
    </StyledModal>,
    modal,
  );
};

export default Modal;

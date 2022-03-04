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

interface Props {
  className?: string;
  style?: React.CSSProperties;
}

const Modal: React.FC<Props> = ({ children, className = '', style }) => {
  return modal
    ? createPortal(
        <StyledModal className={className} style={style} variants={dropIn} initial="hidden" animate="show" exit="exit">
          {children}
        </StyledModal>,
        modal,
      )
    : null;
};

export default Modal;

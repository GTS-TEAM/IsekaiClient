import React from 'react';
import { createPortal } from 'react-dom';
import styled from './Modal.module.scss';
const modal = document.querySelector('#modal');

const Modal = ({ children, className = '', style }) => {
  return createPortal(
    <div style={style} className={`${styled.modal} ${className}`}>
      {children}
    </div>,
    modal,
  );
};

export default Modal;

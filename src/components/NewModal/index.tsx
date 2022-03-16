import React from 'react';
import { createPortal } from 'react-dom';
import { StyledModalWrap } from './styles';

const modal = document.querySelector('#modal') as Element;

const ModalWrapper: React.FC = ({ children }) => {
  return createPortal(<StyledModalWrap>{children}</StyledModalWrap>, modal);
};

export default ModalWrapper;

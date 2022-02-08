import React from 'react';
import { createPortal } from 'react-dom';
import './Overlay.scss';

const overlay = document.querySelector('#overlay');

const Overlay = ({ onClose, style }) => {
  return createPortal(<div className="overlay" onClick={onClose} style={style}></div>, overlay);
};

export default Overlay;

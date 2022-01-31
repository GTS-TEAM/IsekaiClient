import React from 'react';
import { createPortal } from 'react-dom';
import './Overlay.scss';

const overlay = document.querySelector('#overlay');

const Overlay = ({ onClose }) => {
  return createPortal(<div className="overlay" onClick={onClose}></div>, overlay);
};

export default Overlay;

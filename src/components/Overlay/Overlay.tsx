import React from 'react';
import { createPortal } from 'react-dom';
import './Overlay.scss';

const overlay = document.querySelector('#overlay');
interface Props {
  onClose?: () => any;
  style?: React.CSSProperties;
}
const Overlay: React.FC<Props> = ({ onClose, style }) => {
  return overlay ? createPortal(<div className="overlay" onClick={onClose} style={style}></div>, overlay) : null;
};

export default Overlay;

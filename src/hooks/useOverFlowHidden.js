import { useEffect } from 'react';
export const useOverFlowHidden = (isOpen) => {
  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = isOpen ? 'hidden' : null;
  }, [isOpen]);
};

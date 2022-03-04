import { useEffect } from 'react';
export const useOverFlowHidden = (isOpen: boolean): any => {
  useEffect(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = isOpen ? 'hidden' : 'unset';
    }
  }, [isOpen]);
};

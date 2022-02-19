import React, { useEffect, useRef } from 'react';

const ClickOutSide: React.FC<{
  handler: () => any;
  children: (ref: any) => any;
}> = ({ handler, children }) => {
  const ref = useRef<any>(null);
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        handler();
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref, handler]);
  return <>{children(ref)}</>;
};

export default ClickOutSide;

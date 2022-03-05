import { Alert } from '@mui/material';
import React, { useEffect } from 'react';

const ErrorAlert: React.FC<{ children: string; onClose: () => any; isShow: boolean }> = ({ children, isShow, onClose }) => {
  useEffect(() => {
    if (isShow) {
      setTimeout(onClose, 3000);
    }
  }, [isShow, onClose]);
  return isShow ? (
    <Alert
      severity="error"
      variant="filled"
      sx={{
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.6rem',
        fontWeight: '500',
        position: 'fixed',
        top: '2rem',
        right: '2rem',
        zIndex: '101',
      }}
    >
      {children}
    </Alert>
  ) : null;
};

export default ErrorAlert;

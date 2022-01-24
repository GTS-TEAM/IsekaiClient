import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { authSelector } from '../../features/authSlice';

const RequireAuth = ({ children }) => {
  const { token } = useSelector(authSelector);
  const location = useLocation();
  if (!token.accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;

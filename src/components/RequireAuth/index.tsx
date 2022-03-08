import { useAppSelector } from 'hooks/hooks';
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { authSelector } from '../../features/authSlice';
interface Props {
  children?: React.ReactNode;
}
const RequireAuth: React.FC<Props> = ({ children }) => {
  const { token } = useAppSelector(authSelector);
  const location = useLocation();
  if (!token.access_token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
};

export default RequireAuth;

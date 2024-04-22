import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../redux/store';

interface AuthenticatedRouteProps {
  children: React.ReactNode;
}

const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = ({
  children,
}) => {
  const { isAuth } = useAppSelector((state) => state.authReducer);

  if (!isAuth) {
    return <Navigate to="/account/sign-in" replace={true} />;
  }

  return <>{children}</>;
};

export default AuthenticatedRoute;

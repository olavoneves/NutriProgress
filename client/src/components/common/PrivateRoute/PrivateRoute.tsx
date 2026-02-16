import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loading } from '../../common/Loading/Loading';

export interface PrivateRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
  isLoading?: boolean;
  redirectTo?: string;
  requiredRoles?: string[];
  userRoles?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  isLoading = false,
  redirectTo = '/login',
  requiredRoles,
  userRoles,
}) => {
  const location = useLocation();

  if (isLoading) {
    return <Loading fullScreen text="Verificando autenticação..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  if (requiredRoles && requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => 
      userRoles?.includes(role)
    );

    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

PrivateRoute.displayName = 'PrivateRoute';
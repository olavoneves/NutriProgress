import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Loading } from '../../common/Loading/Loading';
export const PrivateRoute = ({ children, isAuthenticated, isLoading = false, redirectTo = '/login', requiredRoles, userRoles, }) => {
    const location = useLocation();
    if (isLoading) {
        return _jsx(Loading, { fullScreen: true, text: "Verificando autentica\u00E7\u00E3o..." });
    }
    if (!isAuthenticated) {
        return _jsx(Navigate, { to: redirectTo, state: { from: location }, replace: true });
    }
    if (requiredRoles && requiredRoles.length > 0) {
        const hasRequiredRole = requiredRoles.some(role => userRoles?.includes(role));
        if (!hasRequiredRole) {
            return _jsx(Navigate, { to: "/unauthorized", replace: true });
        }
    }
    return _jsx(_Fragment, { children: children });
};
PrivateRoute.displayName = 'PrivateRoute';

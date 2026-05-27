import React from 'react';
export interface PrivateRouteProps {
    children: React.ReactNode;
    isAuthenticated: boolean;
    isLoading?: boolean;
    redirectTo?: string;
    requiredRoles?: string[];
    userRoles?: string[];
}
export declare const PrivateRoute: React.FC<PrivateRouteProps>;
//# sourceMappingURL=PrivateRoute.d.ts.map
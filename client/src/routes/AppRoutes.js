import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from './routes.config';
/**
 * AppRoutes — Definição de todas as rotas da aplicação.
 *
 * TODO: Conectar com as pages reais quando implementadas:
 * - LoginPage, RegisterPage
 * - MainLayout com Outlet para rotas protegidas
 * - DashboardPage, PatientsPage, EvaluationsPage, ProfilePage
 */
export const AppRoutes = () => {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: ROUTES.LOGIN, element: _jsx("div", { children: "Login Page (TODO)" }) }), _jsx(Route, { path: ROUTES.REGISTER, element: _jsx("div", { children: "Register Page (TODO)" }) }), _jsx(Route, { path: ROUTES.DASHBOARD, element: _jsx("div", { children: "Dashboard (TODO)" }) }), _jsx(Route, { path: ROUTES.PATIENTS, element: _jsx("div", { children: "Patients List (TODO)" }) }), _jsx(Route, { path: ROUTES.PROFILE, element: _jsx("div", { children: "Profile (TODO)" }) }), _jsx(Route, { path: "/", element: _jsx(Navigate, { to: ROUTES.DASHBOARD, replace: true }) }), _jsx(Route, { path: ROUTES.NOT_FOUND, element: _jsx("div", { children: "P\u00E1gina n\u00E3o encontrada (404)" }) })] }));
};
AppRoutes.displayName = 'AppRoutes';

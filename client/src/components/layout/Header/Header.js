import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '@hooks/useClickOutside';
import { HeaderContainer, HeaderContent, Logo, LogoText, Nav, NavItem, UserSection, UserAvatar, UserInfo, UserName, UserRole, DropdownButton, DropdownMenu, DropdownItem, MenuButton, MobileMenu, MobileNavItem, } from './Header.styles';
export const Header = ({ userName = 'Nutricionista', userInfo, userAvatar, onLogout, onToggleSidebar, }) => {
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);
    const dropdownRef = useClickOutside(closeDropdown, isDropdownOpen);
    const handleNavigate = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);
    };
    const handleLogout = () => {
        setIsDropdownOpen(false);
        setIsMobileMenuOpen(false);
        if (onLogout) {
            onLogout();
        }
    };
    const handleProfile = () => {
        setIsDropdownOpen(false);
        navigate('/profile');
    };
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .substring(0, 2)
            .toUpperCase();
    };
    return (_jsxs(HeaderContainer, { children: [_jsxs(HeaderContent, { children: [_jsxs(Logo, { onClick: () => handleNavigate('/dashboard'), children: [_jsxs("svg", { width: "32", height: "32", viewBox: "0 0 32 32", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("rect", { width: "32", height: "32", rx: "8", fill: "#10b981" }), _jsx("path", { d: "M16 8L22 12V20L16 24L10 20V12L16 8Z", stroke: "white", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("circle", { cx: "16", cy: "16", r: "3", fill: "white" })] }), _jsx(LogoText, { children: "NutriProgress" })] }), onToggleSidebar && (_jsx(NavItem, { onClick: onToggleSidebar, "aria-label": "Alternar sidebar", className: "desktop-only", children: _jsxs("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }), _jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), _jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })] }) })), _jsxs(Nav, { children: [_jsx(NavItem, { onClick: () => handleNavigate('/dashboard'), children: "Dashboard" }), _jsx(NavItem, { onClick: () => handleNavigate('/patients'), children: "Pacientes" })] }), _jsxs(UserSection, { ref: dropdownRef, children: [_jsx(UserAvatar, { onClick: () => setIsDropdownOpen(!isDropdownOpen), children: userAvatar ? (_jsx("img", { src: userAvatar, alt: userName })) : (_jsx("span", { children: getInitials(userName) })) }), _jsxs(UserInfo, { className: "desktop-only", children: [_jsx(UserName, { children: userName }), userInfo && _jsx(UserRole, { children: userInfo })] }), _jsx(DropdownButton, { onClick: () => setIsDropdownOpen(!isDropdownOpen), "aria-label": "Menu do usu\u00E1rio", "aria-expanded": isDropdownOpen, className: "desktop-only", children: _jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "currentColor", children: _jsx("path", { fillRule: "evenodd", d: "M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z", clipRule: "evenodd" }) }) }), isDropdownOpen && (_jsxs(DropdownMenu, { children: [_jsxs(DropdownItem, { onClick: handleProfile, children: [_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), _jsx("circle", { cx: "12", cy: "7", r: "4" })] }), "Meu Perfil"] }), _jsxs(DropdownItem, { onClick: handleLogout, "$danger": true, children: [_jsxs("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" }), _jsx("polyline", { points: "16 17 21 12 16 7" }), _jsx("line", { x1: "21", y1: "12", x2: "9", y2: "12" })] }), "Sair"] })] })), _jsx(MenuButton, { onClick: () => setIsMobileMenuOpen(!isMobileMenuOpen), "aria-label": "Menu mobile", "aria-expanded": isMobileMenuOpen, className: "mobile-only", children: isMobileMenuOpen ? (_jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] })) : (_jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [_jsx("line", { x1: "3", y1: "12", x2: "21", y2: "12" }), _jsx("line", { x1: "3", y1: "6", x2: "21", y2: "6" }), _jsx("line", { x1: "3", y1: "18", x2: "21", y2: "18" })] })) })] })] }), isMobileMenuOpen && (_jsxs(MobileMenu, { children: [_jsx(MobileNavItem, { onClick: () => handleNavigate('/dashboard'), children: "Dashboard" }), _jsx(MobileNavItem, { onClick: () => handleNavigate('/patients'), children: "Pacientes" }), _jsx(MobileNavItem, { onClick: handleProfile, children: "Meu Perfil" }), _jsx(MobileNavItem, { onClick: handleLogout, "$danger": true, children: "Sair" })] }))] }));
};
Header.displayName = 'Header';

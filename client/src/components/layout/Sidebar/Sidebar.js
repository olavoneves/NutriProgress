import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SidebarContainer, SidebarContent, SidebarSection, SidebarSectionTitle, SidebarItem, SidebarItemIcon, SidebarItemText, SidebarItemBadge, SidebarFooter, SidebarFooterText, } from './Sidebar.styles';
export const Sidebar = ({ sections, collapsed = false, version, }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleNavigate = (path, disabled) => {
        if (!disabled) {
            navigate(path);
        }
    };
    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(`${path}/`);
    };
    return (_jsxs(SidebarContainer, { collapsed: collapsed, children: [_jsx(SidebarContent, { children: sections.map((section, sectionIndex) => (_jsxs(SidebarSection, { children: [section.title && !collapsed && (_jsx(SidebarSectionTitle, { children: section.title })), section.items.map((item) => (_jsxs(SidebarItem, { active: isActive(item.path), disabled: item.disabled, collapsed: collapsed, onClick: () => handleNavigate(item.path, item.disabled), title: collapsed ? item.label : undefined, children: [_jsx(SidebarItemIcon, { children: item.icon }), !collapsed && (_jsxs(_Fragment, { children: [_jsx(SidebarItemText, { children: item.label }), item.badge !== undefined && (_jsx(SidebarItemBadge, { children: item.badge }))] }))] }, item.id)))] }, sectionIndex))) }), version && (_jsx(SidebarFooter, { collapsed: collapsed, children: !collapsed && (_jsxs(SidebarFooterText, { children: ["v", version] })) }))] }));
};
Sidebar.displayName = 'Sidebar';

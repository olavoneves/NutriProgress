import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import { LayoutContainer, LayoutWrapper, ContentArea, ContentContainer, } from './MainLayout.styles';
export const MainLayout = ({ userName, userInfo, userAvatar, onLogout, sidebarSections, version, initialCollapsed = false, hideSidebar = false, hideHeader = false, contentPadding = true, maxWidth = '1280px', }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(initialCollapsed);
    const toggleSidebar = () => {
        setSidebarCollapsed(prev => !prev);
    };
    return (_jsxs(LayoutContainer, { children: [!hideHeader && (_jsx(Header, { userName: userName, userInfo: userInfo, userAvatar: userAvatar, onLogout: onLogout, onToggleSidebar: !hideSidebar ? toggleSidebar : undefined })), _jsxs(LayoutWrapper, { children: [!hideSidebar && (_jsx(Sidebar, { sections: sidebarSections, collapsed: sidebarCollapsed, version: version })), _jsx(ContentArea, { hideHeader: hideHeader, children: _jsx(ContentContainer, { contentPadding: contentPadding, maxWidth: maxWidth, children: _jsx(Outlet, {}) }) })] })] }));
};
MainLayout.displayName = 'MainLayout';

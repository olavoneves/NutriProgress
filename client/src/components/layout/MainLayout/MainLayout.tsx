import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../Header';
import { Sidebar } from '../Sidebar';
import type { SidebarSection } from '../Sidebar';
import {
  LayoutContainer,
  LayoutWrapper,
  ContentArea,
  ContentContainer,
} from './MainLayout.styles';

export interface MainLayoutProps {
  userName?: string;
  userInfo?: string;
  userAvatar?: string;
  onLogout?: () => void;
  sidebarSections: SidebarSection[];
  version?: string;
  initialCollapsed?: boolean;
  hideSidebar?: boolean;
  hideHeader?: boolean;
  contentPadding?: boolean;
  maxWidth?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  userName,
  userInfo,
  userAvatar,
  onLogout,
  sidebarSections,
  version,
  initialCollapsed = false,
  hideSidebar = false,
  hideHeader = false,
  contentPadding = true,
  maxWidth = '1280px',
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(initialCollapsed);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <LayoutContainer>
      {!hideHeader && (
        <Header
          userName={userName}
          userInfo={userInfo}
          userAvatar={userAvatar}
          onLogout={onLogout}
          onToggleSidebar={!hideSidebar ? toggleSidebar : undefined}
        />
      )}

      <LayoutWrapper>
        {!hideSidebar && (
          <Sidebar
            sections={sidebarSections}
            collapsed={sidebarCollapsed}
            version={version}
          />
        )}

        <ContentArea hideHeader={hideHeader}>
          <ContentContainer
            contentPadding={contentPadding}
            maxWidth={maxWidth}
          >
            <Outlet />
          </ContentContainer>
        </ContentArea>
      </LayoutWrapper>
    </LayoutContainer>
  );
};

MainLayout.displayName = 'MainLayout';
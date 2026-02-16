import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  SidebarContainer,
  SidebarContent,
  SidebarSection,
  SidebarSectionTitle,
  SidebarItem,
  SidebarItemIcon,
  SidebarItemText,
  SidebarItemBadge,
  SidebarFooter,
  SidebarFooterText,
} from './Sidebar.styles';

export interface SidebarMenuItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: string | number;
  disabled?: boolean;
}

export interface SidebarSection {
  title?: string;
  items: SidebarMenuItem[];
}

export interface SidebarProps {
  sections: SidebarSection[];
  collapsed?: boolean;
  version?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sections,
  collapsed = false,
  version,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string, disabled?: boolean) => {
    if (!disabled) {
      navigate(path);
    }
  };

  const isActive = (path: string): boolean => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <SidebarContent>
        {sections.map((section, sectionIndex) => (
          <SidebarSection key={sectionIndex}>
            {section.title && !collapsed && (
              <SidebarSectionTitle>{section.title}</SidebarSectionTitle>
            )}
            
            {section.items.map((item) => (
              <SidebarItem
                key={item.id}
                active={isActive(item.path)}
                disabled={item.disabled}
                collapsed={collapsed}
                onClick={() => handleNavigate(item.path, item.disabled)}
                title={collapsed ? item.label : undefined}
              >
                <SidebarItemIcon>{item.icon}</SidebarItemIcon>
                
                {!collapsed && (
                  <>
                    <SidebarItemText>{item.label}</SidebarItemText>
                    {item.badge !== undefined && (
                      <SidebarItemBadge>{item.badge}</SidebarItemBadge>
                    )}
                  </>
                )}
              </SidebarItem>
            ))}
          </SidebarSection>
        ))}
      </SidebarContent>

      {version && (
        <SidebarFooter collapsed={collapsed}>
          {!collapsed && (
            <SidebarFooterText>v{version}</SidebarFooterText>
          )}
        </SidebarFooter>
      )}
    </SidebarContainer>
  );
};

Sidebar.displayName = 'Sidebar';
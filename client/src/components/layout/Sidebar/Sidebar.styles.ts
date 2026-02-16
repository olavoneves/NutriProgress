import styled, { css } from 'styled-components';

interface SidebarContainerProps {
  collapsed: boolean;
}

interface SidebarItemProps {
  active: boolean;
  disabled?: boolean;
  collapsed: boolean;
}

interface SidebarFooterProps {
  collapsed: boolean;
}

export const SidebarContainer = styled.aside<SidebarContainerProps>`
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  transition: width 0.3s ease-in-out;
  overflow: hidden;
  flex-shrink: 0;
  
  ${({ collapsed }) => collapsed ? css`
    width: 4.5rem;
  ` : css`
    width: 16rem;
  `}

  @media (max-width: 768px) {
    display: none;
  }
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1rem 0;

  /* Estilização da scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

export const SidebarSection = styled.div`
  padding: 0.5rem 0;

  &:not(:last-child) {
    border-bottom: 1px solid #f3f4f6;
    margin-bottom: 0.5rem;
    padding-bottom: 1rem;
  }
`;

export const SidebarSectionTitle = styled.h3`
  font-size: 0.75rem;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.5rem 1.5rem;
  margin: 0 0 0.5rem 0;
`;

export const SidebarItem = styled.button<SidebarItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-size: 0.938rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  text-align: left;
  position: relative;

  ${({ collapsed }) => collapsed && css`
    justify-content: center;
    padding: 0.75rem 1rem;
  `}

  ${({ active }) => active && css`
    color: #10b981;
    background-color: #f0fdf4;
    font-weight: 600;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: #10b981;
    }
  `}

  ${({ disabled }) => disabled && css`
    opacity: 0.4;
    cursor: not-allowed;
  `}

  ${({ active, disabled }) => !active && !disabled && css`
    &:hover {
      color: #374151;
      background-color: #f9fafb;
    }
  `}

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: -2px;
  }
`;

export const SidebarItemIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const SidebarItemText = styled.span`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SidebarItemBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.375rem;
  background-color: #10b981;
  color: #ffffff;
  font-size: 0.75rem;
  font-weight: 600;
  border-radius: 0.625rem;
  flex-shrink: 0;
`;

export const SidebarFooter = styled.div<SidebarFooterProps>`
  padding: 1rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ collapsed }) => collapsed && css`
    padding: 1rem;
  `}
`;

export const SidebarFooterText = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
  font-weight: 500;
`;
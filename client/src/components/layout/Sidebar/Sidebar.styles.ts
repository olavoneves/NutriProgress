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
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  transition: width ${({ theme }) => theme.transitions.slow};
  overflow: hidden;
  flex-shrink: 0;
  
  ${({ collapsed, theme }) => collapsed ? css`
    width: ${theme.layout.sidebarCollapsedWidth};
  ` : css`
    width: ${theme.layout.sidebarWidth};
  `}

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const SidebarContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: ${({ theme }) => theme.spacing.md} 0;

  /* Estilização da scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const SidebarSection = styled.div`
  padding: ${({ theme }) => theme.spacing.sm} 0;

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    padding-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const SidebarSectionTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[400]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  margin: 0 0 ${({ theme }) => theme.spacing.sm} 0;
`;

export const SidebarItem = styled.button<SidebarItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem ${({ theme }) => theme.spacing.lg};
  background: none;
  border: none;
  font-size: 0.938rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray[500]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-family: inherit;
  text-align: left;
  position: relative;

  ${({ collapsed }) => collapsed && css`
    justify-content: center;
    padding: 0.75rem ${({ theme }) => theme.spacing.md};
  `}

  ${({ active, theme }) => active && css`
    color: ${theme.colors.primary[500]};
    background-color: ${theme.colors.primary[50]};
    font-weight: ${theme.typography.fontWeight.semibold};

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background-color: ${theme.colors.primary[500]};
    }
  `}

  ${({ disabled }) => disabled && css`
    opacity: 0.4;
    cursor: not-allowed;
  `}

  ${({ active, disabled, theme }) => !active && !disabled && css`
    &:hover {
      color: ${theme.colors.gray[700]};
      background-color: ${theme.colors.gray[50]};
    }
  `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
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
  background-color: ${({ theme }) => theme.colors.primary[500]};
  color: ${({ theme }) => theme.colors.white};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: 0.625rem;
  flex-shrink: 0;
`;

export const SidebarFooter = styled.div<SidebarFooterProps>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ collapsed, theme }) => collapsed && css`
    padding: ${theme.spacing.md};
  `}
`;

export const SidebarFooterText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray[400]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;
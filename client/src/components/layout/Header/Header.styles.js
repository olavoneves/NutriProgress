import styled, { css } from 'styled-components';
export const HeaderContainer = styled.header `
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.header};
  box-shadow: ${({ theme }) => theme.shadows.md};
`;
export const HeaderContent = styled.div `
  max-width: ${({ theme }) => theme.layout.maxContentWidth};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.lg};
  height: ${({ theme }) => theme.layout.headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing.md};
    gap: ${({ theme }) => theme.spacing.md};
  }
`;
export const Logo = styled.div `
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  transition: opacity ${({ theme }) => theme.transitions.normal};

  &:hover {
    opacity: 0.8;
  }
`;
export const LogoText = styled.span `
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;
export const Nav = styled.nav `
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing.xl};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
export const NavItem = styled.button `
  background: none;
  border: none;
  font-size: 0.938rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray[500]};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm} 0.75rem;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all ${({ theme }) => theme.transitions.normal};
  font-family: inherit;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
    background-color: ${({ theme }) => theme.colors.primary[50]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;
export const UserSection = styled.div `
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;

  .desktop-only {
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      display: none;
    }
  }

  .mobile-only {
    @media (min-width: 769px) {
      display: none;
    }
  }
`;
export const UserAvatar = styled.div `
  width: 2.5rem;
  height: 2.5rem;
  border-radius: ${({ theme }) => theme.radii.full};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary[500]} 0%, ${({ theme }) => theme.colors.primary[600]} 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.white};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  cursor: pointer;
  transition: transform ${({ theme }) => theme.transitions.normal};
  overflow: hidden;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    user-select: none;
  }
`;
export const UserInfo = styled.div `
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;
export const UserName = styled.span `
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;
export const UserRole = styled.span `
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
`;
export const DropdownButton = styled.button `
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray[500]};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.xs};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;
export const DropdownMenu = styled.div `
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  right: 0;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  min-width: 200px;
  padding: ${({ theme }) => theme.spacing.sm};
  z-index: ${({ theme }) => theme.zIndex.dropdown};
`;
export const DropdownItem = styled.button `
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-family: inherit;
  text-align: left;

  ${({ $danger, theme }) => $danger && css `
    color: ${theme.colors.danger[500]};

    &:hover {
      background-color: ${theme.colors.danger[50]};
      color: ${theme.colors.danger[600]};
    }
  `}

  ${({ $danger, theme }) => !$danger && css `
    &:hover {
      background-color: ${theme.colors.gray[100]};
      color: ${theme.colors.text.primary};
    }
  `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: -2px;
  }

  svg {
    flex-shrink: 0;
  }
`;
export const MenuButton = styled.button `
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.gray[500]};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all ${({ theme }) => theme.transitions.normal};

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.gray[100]};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }
`;
export const MobileMenu = styled.div `
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};

  @media (min-width: 769px) {
    display: none;
  }
`;
export const MobileNavItem = styled.button `
  width: 100%;
  padding: 0.75rem ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.938rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  color: ${({ theme }) => theme.colors.gray[700]};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  font-family: inherit;
  text-align: left;

  ${({ $danger, theme }) => $danger && css `
    color: ${theme.colors.danger[500]};

    &:hover {
      background-color: ${theme.colors.danger[50]};
      color: ${theme.colors.danger[600]};
    }
  `}

  ${({ $danger, theme }) => !$danger && css `
    &:hover {
      background-color: ${theme.colors.gray[100]};
      color: ${theme.colors.text.primary};
    }
  `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: -2px;
  }
`;

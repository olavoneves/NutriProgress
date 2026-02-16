import styled, { css } from 'styled-components';

interface DropdownItemProps {
  $danger?: boolean;
}

interface MobileNavItemProps {
  $danger?: boolean;
}

export const HeaderContainer = styled.header`
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

export const HeaderContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: 768px) {
    padding: 0 1rem;
    gap: 1rem;
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  user-select: none;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

export const LogoText = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;

  @media (max-width: 480px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
  margin-left: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const NavItem = styled.button`
  background: none;
  border: none;
  font-size: 0.938rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  font-family: inherit;

  &:hover {
    color: #10b981;
    background-color: #f0fdf4;
  }

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }
`;

export const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  position: relative;

  .desktop-only {
    @media (max-width: 768px) {
      display: none;
    }
  }

  .mobile-only {
    @media (min-width: 769px) {
      display: none;
    }
  }
`;

export const UserAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
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

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const UserName = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  line-height: 1.2;
`;

export const UserRole = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.2;
`;

export const DropdownButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.25rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #111827;
    background-color: #f3f4f6;
  }

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  padding: 0.5rem;
  z-index: 50;
`;

export const DropdownItem = styled.button<DropdownItemProps>`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  text-align: left;

  ${({ $danger }) => $danger && css`
    color: #ef4444;

    &:hover {
      background-color: #fef2f2;
      color: #dc2626;
    }
  `}

  ${({ $danger }) => !$danger && css`
    &:hover {
      background-color: #f3f4f6;
      color: #111827;
    }
  `}

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: -2px;
  }

  svg {
    flex-shrink: 0;
  }
`;

export const MenuButton = styled.button`
  background: none;
  border: none;
  color: #6b7280;
  cursor: pointer;
  padding: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: #111827;
    background-color: #f3f4f6;
  }

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }
`;

export const MobileMenu = styled.div`
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (min-width: 769px) {
    display: none;
  }
`;

export const MobileNavItem = styled.button<MobileNavItemProps>`
  width: 100%;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.938rem;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  text-align: left;

  ${({ $danger }) => $danger && css`
    color: #ef4444;

    &:hover {
      background-color: #fef2f2;
      color: #dc2626;
    }
  `}

  ${({ $danger }) => !$danger && css`
    &:hover {
      background-color: #f3f4f6;
      color: #111827;
    }
  `}

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: -2px;
  }
`;
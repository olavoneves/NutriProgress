import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClickOutside } from '@hooks/useClickOutside';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  LogoText,
  Nav,
  NavItem,
  UserSection,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  DropdownButton,
  DropdownMenu,
  DropdownItem,
  MenuButton,
  MobileMenu,
  MobileNavItem,
} from './Header.styles';

export interface HeaderProps {
  userName?: string;
  userInfo?: string;
  userAvatar?: string;
  onLogout?: () => void;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = 'Nutricionista',
  userInfo,
  userAvatar,
  onLogout,
  onToggleSidebar,
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeDropdown = useCallback(() => setIsDropdownOpen(false), []);
  const dropdownRef = useClickOutside<HTMLDivElement>(closeDropdown, isDropdownOpen);

  const handleNavigate = (path: string) => {
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

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* Logo */}
        <Logo onClick={() => handleNavigate('/dashboard')}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" rx="8" fill="#10b981" />
            <path
              d="M16 8L22 12V20L16 24L10 20V12L16 8Z"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="16" cy="16" r="3" fill="white" />
          </svg>
          <LogoText>NutriProgress</LogoText>
        </Logo>

        {/* Sidebar Toggle */}
        {onToggleSidebar && (
          <NavItem
            onClick={onToggleSidebar}
            aria-label="Alternar sidebar"
            className="desktop-only"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </NavItem>
        )}

        {/* Navigation - Desktop */}
        <Nav>
          <NavItem onClick={() => handleNavigate('/dashboard')}>
            Dashboard
          </NavItem>
          <NavItem onClick={() => handleNavigate('/patients')}>
            Pacientes
          </NavItem>
        </Nav>

        {/* User Section */}
        <UserSection ref={dropdownRef}>
          <UserAvatar onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            {userAvatar ? (
              <img src={userAvatar} alt={userName} />
            ) : (
              <span>{getInitials(userName)}</span>
            )}
          </UserAvatar>

          <UserInfo className="desktop-only">
            <UserName>{userName}</UserName>
            {userInfo && <UserRole>{userInfo}</UserRole>}
          </UserInfo>

          <DropdownButton
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-label="Menu do usuário"
            aria-expanded={isDropdownOpen}
            className="desktop-only"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </DropdownButton>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <DropdownMenu>
              <DropdownItem onClick={handleProfile}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Meu Perfil
              </DropdownItem>
              <DropdownItem onClick={handleLogout} $danger>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sair
              </DropdownItem>
            </DropdownMenu>
          )}

          {/* Mobile Menu Button */}
          <MenuButton
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu mobile"
            aria-expanded={isMobileMenuOpen}
            className="mobile-only"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </MenuButton>
        </UserSection>
      </HeaderContent>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <MobileMenu>
          <MobileNavItem onClick={() => handleNavigate('/dashboard')}>
            Dashboard
          </MobileNavItem>
          <MobileNavItem onClick={() => handleNavigate('/patients')}>
            Pacientes
          </MobileNavItem>
          <MobileNavItem onClick={handleProfile}>
            Meu Perfil
          </MobileNavItem>
          <MobileNavItem onClick={handleLogout} $danger>
            Sair
          </MobileNavItem>
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

Header.displayName = 'Header';
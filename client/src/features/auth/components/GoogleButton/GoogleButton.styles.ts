import styled, { keyframes } from 'styled-components';
import { tokens } from '@styles/tokens';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const GoogleButtonContainer = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  background-color: ${tokens.colors.white};
  border: 2px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.lg};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.gray[700]};
  cursor: pointer;
  transition: ${tokens.transitions.normal};
  font-family: inherit;

  &:hover:not(:disabled) {
    background-color: ${tokens.colors.gray[50]};
    border-color: ${tokens.colors.gray[300]};
    box-shadow: ${tokens.shadows.sm};
  }

  &:active:not(:disabled) {
    background-color: ${tokens.colors.gray[100]};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${tokens.colors.brand};
    outline-offset: 2px;
  }

  .spinner {
    width: 1.25rem;
    height: 1.25rem;
    border: 2px solid ${tokens.colors.gray[300]};
    border-top-color: ${tokens.colors.brand};
    border-radius: 50%;
    animation: ${spin} 0.6s linear infinite;
  }
`;

export const GoogleIcon = styled.span`
  width: 1.25rem;
  height: 1.25rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const GoogleButtonText = styled.span`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.medium};
`;

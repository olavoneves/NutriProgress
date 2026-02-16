import styled, { css, keyframes } from 'styled-components';
import type { ButtonVariant, ButtonSize } from './Button';

interface ButtonContainerProps {
  variant: ButtonVariant;
  size: ButtonSize;
  fullWidth: boolean;
}

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const variantStyles = {
  primary: css`
    background-color: #10b981;
    color: #ffffff;
    border: 2px solid #10b981;

    &:hover:not(:disabled) {
      background-color: #059669;
      border-color: #059669;
    }

    &:active:not(:disabled) {
      background-color: #047857;
      border-color: #047857;
    }
  `,
  
  secondary: css`
    background-color: #6b7280;
    color: #ffffff;
    border: 2px solid #6b7280;

    &:hover:not(:disabled) {
      background-color: #4b5563;
      border-color: #4b5563;
    }

    &:active:not(:disabled) {
      background-color: #374151;
      border-color: #374151;
    }
  `,
  
  outline: css`
    background-color: transparent;
    color: #10b981;
    border: 2px solid #10b981;

    &:hover:not(:disabled) {
      background-color: #f0fdf4;
    }

    &:active:not(:disabled) {
      background-color: #dcfce7;
    }
  `,
  
  danger: css`
    background-color: #ef4444;
    color: #ffffff;
    border: 2px solid #ef4444;

    &:hover:not(:disabled) {
      background-color: #dc2626;
      border-color: #dc2626;
    }

    &:active:not(:disabled) {
      background-color: #b91c1c;
      border-color: #b91c1c;
    }
  `,
  
  success: css`
    background-color: #22c55e;
    color: #ffffff;
    border: 2px solid #22c55e;

    &:hover:not(:disabled) {
      background-color: #16a34a;
      border-color: #16a34a;
    }

    &:active:not(:disabled) {
      background-color: #15803d;
      border-color: #15803d;
    }
  `,
};

const sizeStyles = {
  small: css`
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    gap: 0.375rem;
  `,
  
  medium: css`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    gap: 0.5rem;
  `,
  
  large: css`
    padding: 1rem 2rem;
    font-size: 1.125rem;
    gap: 0.625rem;
  `,
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-family: inherit;
  outline: none;
  position: relative;
  
  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }

  .icon-left {
    display: inline-flex;
    align-items: center;
  }

  .icon-right {
    display: inline-flex;
    align-items: center;
  }

  .spinner {
    width: 1rem;
    height: 1rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: #ffffff;
    border-radius: 50%;
    animation: ${spin} 0.6s linear infinite;
    margin-right: 0.5rem;
  }
`;
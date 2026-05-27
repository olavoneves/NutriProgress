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
    background-color: ${({ theme }) => theme.colors.primary[500]};
    color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.primary[500]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[600]};
      border-color: ${({ theme }) => theme.colors.primary[600]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[700]};
      border-color: ${({ theme }) => theme.colors.primary[700]};
    }
  `,

  secondary: css`
    background-color: ${({ theme }) => theme.colors.gray[500]};
    color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.gray[500]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.gray[600]};
      border-color: ${({ theme }) => theme.colors.gray[600]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.gray[700]};
      border-color: ${({ theme }) => theme.colors.gray[700]};
    }
  `,

  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary[500]};
    border: 2px solid ${({ theme }) => theme.colors.primary[500]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[50]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[100]};
    }
  `,

  danger: css`
    background-color: ${({ theme }) => theme.colors.danger[500]};
    color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.danger[500]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.danger[600]};
      border-color: ${({ theme }) => theme.colors.danger[600]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.danger[700]};
      border-color: ${({ theme }) => theme.colors.danger[700]};
    }
  `,

  success: css`
    background-color: ${({ theme }) => theme.colors.success[500]};
    color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.success[500]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.success[600]};
      border-color: ${({ theme }) => theme.colors.success[600]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.success[700]};
      border-color: ${({ theme }) => theme.colors.success[700]};
    }
  `,
};

const sizeStyles = {
  small: css`
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    gap: 0.375rem;
  `,

  medium: css`
    padding: 0.75rem ${({ theme }) => theme.spacing.lg};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
    gap: ${({ theme }) => theme.spacing.sm};
  `,

  large: css`
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
    gap: 0.625rem;
  `,
};

export const ButtonContainer = styled.button<ButtonContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
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
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
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
    border-top-color: ${({ theme }) => theme.colors.white};
    border-radius: ${({ theme }) => theme.radii.full};
    animation: ${spin} 0.6s linear infinite;
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;
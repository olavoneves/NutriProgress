import styled, { css } from 'styled-components';
import type { InputVariant, InputSize } from './Input';

interface InputWrapperProps {
  fullWidth: boolean;
}

interface InputContainerProps {
  variant: InputVariant;
  size: InputSize;
  hasError: boolean;
  disabled?: boolean;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}

interface LabelProps {
  disabled?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
`;

export const Label = styled.label<LabelProps>`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  
  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}

  .required {
    color: #ef4444;
    margin-left: 0.25rem;
  }
`;

const variantStyles = {
  default: css<{ hasError: boolean }>`
    background-color: #ffffff;
    border: 2px solid ${({ hasError }) => hasError ? '#ef4444' : '#d1d5db'};

    &:hover:not(:disabled) {
      border-color: ${({ hasError }) => hasError ? '#dc2626' : '#9ca3af'};
    }

    &:focus-within {
      border-color: ${({ hasError }) => hasError ? '#ef4444' : '#10b981'};
      box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
    }
  `,
  
  filled: css<{ hasError: boolean }>`
    background-color: #f3f4f6;
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background-color: #e5e7eb;
    }

    &:focus-within {
      background-color: #ffffff;
      border-color: ${({ hasError }) => hasError ? '#ef4444' : '#10b981'};
      box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
    }

    ${({ hasError }) => hasError && css`
      background-color: #fef2f2;
      border-color: #ef4444;
    `}
  `,
  
  outline: css<{ hasError: boolean }>`
    background-color: transparent;
    border: 2px solid ${({ hasError }) => hasError ? '#ef4444' : '#10b981'};

    &:hover:not(:disabled) {
      border-color: ${({ hasError }) => hasError ? '#dc2626' : '#059669'};
    }

    &:focus-within {
      border-color: ${({ hasError }) => hasError ? '#ef4444' : '#10b981'};
      box-shadow: 0 0 0 3px ${({ hasError }) => hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
    }
  `,
};

const sizeStyles = {
  small: css`
    padding: 0.5rem 0.75rem;
    font-size: 0.875rem;
  `,
  
  medium: css`
    padding: 0.75rem 1rem;
    font-size: 1rem;
  `,
  
  large: css`
    padding: 1rem 1.25rem;
    font-size: 1.125rem;
  `,
};

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  
  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}

  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    background-color: #f9fafb;
  `}

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: #111827;
    font-family: inherit;
    font-size: inherit;
    
    &::placeholder {
      color: #9ca3af;
    }

    &:disabled {
      cursor: not-allowed;
    }

    /* Remove setas do input number no Chrome, Safari, Edge */
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Remove setas do input number no Firefox */
    &[type='number'] {
      -moz-appearance: textfield;
    }
  }

  .icon-left,
  .icon-right {
    display: inline-flex;
    align-items: center;
    color: #6b7280;
    flex-shrink: 0;
  }
`;

export const HelperText = styled.span`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: -0.25rem;
`;

export const ErrorText = styled.span`
  font-size: 0.75rem;
  color: #ef4444;
  font-weight: 500;
  margin-top: -0.25rem;
`;
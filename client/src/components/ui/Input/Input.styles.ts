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
  gap: ${({ theme }) => theme.spacing.sm};
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}
`;

export const Label = styled.label<LabelProps>`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.gray[700]};
  
  ${({ disabled }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
  `}

  .required {
    color: ${({ theme }) => theme.colors.danger[500]};
    margin-left: ${({ theme }) => theme.spacing.xs};
  }
`;

const variantStyles = {
  default: css<{ hasError: boolean }>`
    background-color: ${(props) => props.theme.colors.white};
    border: 2px solid ${(props) => props.hasError ? props.theme.colors.danger[500] : props.theme.colors.gray[300]};

    &:hover:not(:disabled) {
      border-color: ${(props) => props.hasError ? props.theme.colors.danger[600] : props.theme.colors.gray[400]};
    }

    &:focus-within {
      border-color: ${(props) => props.hasError ? props.theme.colors.danger[500] : props.theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${(props) => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
    }
  `,

  filled: css<{ hasError: boolean }>`
    background-color: ${(props) => props.theme.colors.gray[100]};
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      background-color: ${(props) => props.theme.colors.gray[200]};
    }

    &:focus-within {
      background-color: ${(props) => props.theme.colors.white};
      border-color: ${(props) => props.hasError ? props.theme.colors.danger[500] : props.theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${(props) => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
    }

    ${(props) => props.hasError && css`
      background-color: ${props.theme.colors.danger[50]};
      border-color: ${props.theme.colors.danger[500]};
    `}
  `,

  outline: css<{ hasError: boolean }>`
    background-color: transparent;
    border: 2px solid ${(props) => props.hasError ? props.theme.colors.danger[500] : props.theme.colors.primary[500]};

    &:hover:not(:disabled) {
      border-color: ${(props) => props.hasError ? props.theme.colors.danger[600] : props.theme.colors.primary[600]};
    }

    &:focus-within {
      border-color: ${(props) => props.hasError ? props.theme.colors.danger[500] : props.theme.colors.primary[500]};
      box-shadow: 0 0 0 3px ${(props) => props.hasError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'};
    }
  `,
};

const sizeStyles = {
  small: css`
    padding: ${({ theme }) => theme.spacing.sm} 0.75rem;
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
  `,

  medium: css`
    padding: 0.75rem ${({ theme }) => theme.spacing.md};
    font-size: ${({ theme }) => theme.typography.fontSize.base};
  `,

  large: css`
    padding: ${({ theme }) => theme.spacing.md} 1.25rem;
    font-size: ${({ theme }) => theme.typography.fontSize.lg};
  `,
};

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.lg};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  ${({ variant }) => variantStyles[variant]}
  ${({ size }) => sizeStyles[size]}

  ${({ disabled, theme }) => disabled && css`
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${theme.colors.gray[50]};
  `}

  input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    color: ${({ theme }) => theme.colors.gray[900]};
    font-family: inherit;
    font-size: inherit;
    
    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[400]};
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
    color: ${({ theme }) => theme.colors.gray[500]};
    flex-shrink: 0;
  }
`;

export const HelperText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.gray[500]};
  margin-top: -${({ theme }) => theme.spacing.xs};
`;

export const ErrorText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.danger[500]};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-top: -${({ theme }) => theme.spacing.xs};
`;
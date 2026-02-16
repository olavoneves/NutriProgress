import React from 'react';
import { ButtonContainer } from './Button.styles';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  disabled,
  type = 'button',
  ...rest
}) => {
  return (
    <ButtonContainer
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
      type={type}
      {...rest}
    >
      {isLoading ? (
        <>
          <span className="spinner" />
          <span>Carregando...</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="icon-left">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="icon-right">{rightIcon}</span>}
        </>
      )}
    </ButtonContainer>
  );
};
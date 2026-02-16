import React, { forwardRef } from 'react';
import { InputContainer, InputWrapper, Label, HelperText, ErrorText } from './Input.styles.ts';

export type InputVariant = 'default' | 'filled' | 'outline';
export type InputSize = 'small' | 'medium' | 'large';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: InputVariant;
  size?: InputSize;
  label?: string;
  fullWidth?: boolean;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  required?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      size = 'medium',
      fullWidth = true,
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      required = false,
      disabled,
      className,
      id,
      ...rest
    },
    ref
  ) => {
    const inputId = id || `input-${Math.random().toString(36).substring(7)}`;
    const hasError = Boolean(error);

    return (
      <InputWrapper fullWidth={fullWidth} className={className}>
        {label && (
          <Label htmlFor={inputId} disabled={disabled}>
            {label}
            {required && <span className="required">*</span>}
          </Label>
        )}
        
        <InputContainer
          variant={variant}
          size={size}
          hasError={hasError}
          disabled={disabled}
          hasLeftIcon={Boolean(leftIcon)}
          hasRightIcon={Boolean(rightIcon)}
        >
          {leftIcon && <span className="icon-left">{leftIcon}</span>}
          
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={hasError}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            {...rest}
          />
          
          {rightIcon && <span className="icon-right">{rightIcon}</span>}
        </InputContainer>

        {error && (
          <ErrorText id={`${inputId}-error`} role="alert">
            {error}
          </ErrorText>
        )}
        
        {!error && helperText && (
          <HelperText id={`${inputId}-helper`}>
            {helperText}
          </HelperText>
        )}
      </InputWrapper>
    );
  }
);

Input.displayName = 'Input';
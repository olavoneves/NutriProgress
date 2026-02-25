import type React from 'react';
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
export declare const Input: React.ForwardRefExoticComponent<InputProps & React.RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=Input.d.ts.map
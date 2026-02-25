import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useId, forwardRef } from 'react';
import { InputContainer, InputWrapper, Label, HelperText, ErrorText } from './Input.styles';
export const Input = forwardRef(({ variant = 'default', size = 'medium', fullWidth = true, label, helperText, error, leftIcon, rightIcon, required = false, disabled, className, id, ...rest }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const hasError = Boolean(error);
    return (_jsxs(InputWrapper, { fullWidth: fullWidth, className: className, children: [label && (_jsxs(Label, { htmlFor: inputId, disabled: disabled, children: [label, required && _jsx("span", { className: "required", children: "*" })] })), _jsxs(InputContainer, { variant: variant, size: size, hasError: hasError, disabled: disabled, hasLeftIcon: Boolean(leftIcon), hasRightIcon: Boolean(rightIcon), children: [leftIcon && _jsx("span", { className: "icon-left", children: leftIcon }), _jsx("input", { ref: ref, id: inputId, disabled: disabled, "aria-invalid": hasError, "aria-describedby": error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined, ...rest }), rightIcon && _jsx("span", { className: "icon-right", children: rightIcon })] }), error && (_jsx(ErrorText, { id: `${inputId}-error`, role: "alert", children: error })), !error && helperText && (_jsx(HelperText, { id: `${inputId}-helper`, children: helperText }))] }));
});
Input.displayName = 'Input';

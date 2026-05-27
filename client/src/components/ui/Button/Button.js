import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { ButtonContainer } from './Button.styles';
export const Button = ({ variant = 'primary', size = 'medium', fullWidth = false, isLoading = false, leftIcon, rightIcon, children, disabled, type = 'button', ...rest }) => {
    return (_jsx(ButtonContainer, { variant: variant, size: size, fullWidth: fullWidth, disabled: disabled || isLoading, type: type, ...rest, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx("span", { className: "spinner" }), _jsx("span", { children: "Carregando..." })] })) : (_jsxs(_Fragment, { children: [leftIcon && _jsx("span", { className: "icon-left", children: leftIcon }), _jsx("span", { children: children }), rightIcon && _jsx("span", { className: "icon-right", children: rightIcon })] })) }));
};

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { LoadingContainer, LoadingSpinner, LoadingText, LoadingOverlay, } from './Loading.styles';
export const Loading = ({ size = 'medium', variant = 'spinner', text, fullScreen = false, color = '#10b981', }) => {
    const loadingContent = (_jsxs(LoadingContainer, { fullScreen: fullScreen, children: [_jsxs(LoadingSpinner, { size: size, variant: variant, color: color, role: "status", "aria-label": "Carregando", children: [variant === 'spinner' && (_jsx("svg", { viewBox: "0 0 50 50", children: _jsx("circle", { cx: "25", cy: "25", r: "20", fill: "none", strokeWidth: "4" }) })), variant === 'dots' && (_jsxs("div", { className: "dots", children: [_jsx("span", { className: "dot" }), _jsx("span", { className: "dot" }), _jsx("span", { className: "dot" })] })), variant === 'pulse' && (_jsx("div", { className: "pulse-ring" }))] }), text && _jsx(LoadingText, { children: text })] }));
    if (fullScreen) {
        return (_jsx(LoadingOverlay, { children: loadingContent }));
    }
    return loadingContent;
};
Loading.displayName = 'Loading';

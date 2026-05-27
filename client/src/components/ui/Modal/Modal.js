import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay, ModalContainer, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalCloseButton, } from './Modal.styles';
export const Modal = ({ isOpen, onClose, size = 'medium', title, showCloseButton = true, closeOnOverlayClick = true, closeOnEsc = true, blockScroll = true, children, footer, }) => {
    const handleEscapeKey = useCallback((event) => {
        if (closeOnEsc && event.key === 'Escape') {
            onClose();
        }
    }, [closeOnEsc, onClose]);
    useEffect(() => {
        if (isOpen && blockScroll) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [isOpen, blockScroll]);
    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleEscapeKey);
            return () => {
                document.removeEventListener('keydown', handleEscapeKey);
            };
        }
    }, [isOpen, handleEscapeKey]);
    const handleOverlayClick = (event) => {
        if (closeOnOverlayClick && event.target === event.currentTarget) {
            onClose();
        }
    };
    if (!isOpen) {
        return null;
    }
    const modalContent = (_jsx(ModalOverlay, { onClick: handleOverlayClick, role: "dialog", "aria-modal": "true", children: _jsxs(ModalContainer, { size: size, onClick: (e) => e.stopPropagation(), children: [(title || showCloseButton) && (_jsxs(ModalHeader, { children: [title && _jsx(ModalTitle, { children: title }), showCloseButton && (_jsx(ModalCloseButton, { onClick: onClose, "aria-label": "Fechar modal", type: "button", children: _jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) }))] })), _jsx(ModalBody, { children: children }), footer && _jsx(ModalFooter, { children: footer })] }) }));
    return createPortal(modalContent, document.body);
};
Modal.displayName = 'Modal';

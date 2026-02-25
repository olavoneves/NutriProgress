import React from 'react';
export type ModalSize = 'small' | 'medium' | 'large' | 'full';
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    size?: ModalSize;
    title?: string;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;
    closeOnEsc?: boolean;
    blockScroll?: boolean;
    children: React.ReactNode;
    footer?: React.ReactNode;
}
export declare const Modal: React.FC<ModalProps>;
//# sourceMappingURL=Modal.d.ts.map
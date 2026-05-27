import React from 'react';
export type LoadingSize = 'small' | 'medium' | 'large';
export type LoadingVariant = 'spinner' | 'dots' | 'pulse';
export interface LoadingProps {
    size?: LoadingSize;
    variant?: LoadingVariant;
    text?: string;
    fullScreen?: boolean;
    color?: string;
}
export declare const Loading: React.FC<LoadingProps>;
//# sourceMappingURL=Loading.d.ts.map
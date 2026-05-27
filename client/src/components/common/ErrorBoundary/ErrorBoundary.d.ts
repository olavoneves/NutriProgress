import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
export interface ErrorBoundaryProps {
    children: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
    fallback?: ReactNode;
    showDetails?: boolean;
}
interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}
export declare class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static displayName: string;
    constructor(props: ErrorBoundaryProps);
    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState>;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    handleReset: () => void;
    handleReload: () => void;
    handleGoHome: () => void;
    render(): ReactNode;
}
export {};
//# sourceMappingURL=ErrorBoundary.d.ts.map
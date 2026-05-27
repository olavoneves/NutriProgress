import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from 'react';
import { ErrorContainer, ErrorContent, ErrorIcon, ErrorTitle, ErrorMessage, ErrorDetails, ErrorActions, ErrorCode, } from './ErrorBoundary.styles';
import { Button } from '../../ui/Button/Button';
export class ErrorBoundary extends Component {
    static displayName = 'ErrorBoundary';
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
            error: null,
            errorInfo: null,
        };
    }
    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error,
        };
    }
    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary capturou um erro:', error, errorInfo);
        this.setState({
            error,
            errorInfo,
        });
        if (this.props.onError) {
            this.props.onError(error, errorInfo);
        }
    }
    handleReset = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        });
    };
    handleReload = () => {
        window.location.reload();
    };
    handleGoHome = () => {
        window.location.href = '/dashboard';
    };
    render() {
        const { hasError, error, errorInfo } = this.state;
        const { children, fallback, showDetails } = this.props;
        if (hasError) {
            if (fallback) {
                return fallback;
            }
            return (_jsx(ErrorContainer, { children: _jsxs(ErrorContent, { children: [_jsx(ErrorIcon, { children: _jsxs("svg", { width: "64", height: "64", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), _jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })] }) }), _jsx(ErrorTitle, { children: "Algo deu errado" }), _jsx(ErrorMessage, { children: "Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada e estamos trabalhando para resolver o problema." }), showDetails && error && (_jsxs(ErrorDetails, { children: [_jsxs(ErrorCode, { children: [_jsx("strong", { children: "Erro:" }), " ", error.toString()] }), errorInfo && (_jsxs(ErrorCode, { children: [_jsx("strong", { children: "Stack Trace:" }), _jsx("pre", { children: errorInfo.componentStack })] }))] })), _jsxs(ErrorActions, { children: [_jsx(Button, { variant: "secondary", onClick: this.handleReset, children: "Tentar Novamente" }), _jsx(Button, { variant: "primary", onClick: this.handleReload, children: "Recarregar P\u00E1gina" }), _jsx(Button, { variant: "outline", onClick: this.handleGoHome, children: "Ir para Dashboard" })] })] }) }));
        }
        return children;
    }
}

import React, { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import {
  ErrorContainer,
  ErrorContent,
  ErrorIcon,
  ErrorTitle,
  ErrorMessage,
  ErrorDetails,
  ErrorActions,
  ErrorCode,
} from './ErrorBoundary.styles';
import { Button } from '../../ui/Button/Button';

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

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  static displayName = 'ErrorBoundary';

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  handleGoHome = (): void => {
    window.location.href = '/dashboard';
  };

  render(): ReactNode {
    const { hasError, error, errorInfo } = this.state;
    const { children, fallback, showDetails } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <ErrorContainer>
          <ErrorContent>
            <ErrorIcon>
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </ErrorIcon>

            <ErrorTitle>Algo deu errado</ErrorTitle>

            <ErrorMessage>
              Desculpe, ocorreu um erro inesperado. Nossa equipe foi notificada e estamos
              trabalhando para resolver o problema.
            </ErrorMessage>

            {showDetails && error && (
              <ErrorDetails>
                <ErrorCode>
                  <strong>Erro:</strong> {error.toString()}
                </ErrorCode>
                {errorInfo && (
                  <ErrorCode>
                    <strong>Stack Trace:</strong>
                    <pre>{errorInfo.componentStack}</pre>
                  </ErrorCode>
                )}
              </ErrorDetails>
            )}

            <ErrorActions>
              <Button variant="secondary" onClick={this.handleReset}>
                Tentar Novamente
              </Button>
              <Button variant="primary" onClick={this.handleReload}>
                Recarregar Página
              </Button>
              <Button variant="outline" onClick={this.handleGoHome}>
                Ir para Dashboard
              </Button>
            </ErrorActions>
          </ErrorContent>
        </ErrorContainer>
      );
    }

    return children;
  }
}
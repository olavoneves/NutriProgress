import React from 'react';
import {
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  LoadingOverlay,
} from './Loading.styles';

export type LoadingSize = 'small' | 'medium' | 'large';
export type LoadingVariant = 'spinner' | 'dots' | 'pulse';

export interface LoadingProps {
  size?: LoadingSize;
  variant?: LoadingVariant;
  text?: string;
  fullScreen?: boolean;
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  size = 'medium',
  variant = 'spinner',
  text,
  fullScreen = false,
  color = '#10b981',
}) => {
  const loadingContent = (
    <LoadingContainer fullScreen={fullScreen}>
      <LoadingSpinner
        size={size}
        variant={variant}
        color={color}
        role="status"
        aria-label="Carregando"
      >
        {variant === 'spinner' && (
          <svg viewBox="0 0 50 50">
            <circle
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="4"
            />
          </svg>
        )}
        
        {variant === 'dots' && (
          <div className="dots">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        )}
        
        {variant === 'pulse' && (
          <div className="pulse-ring" />
        )}
      </LoadingSpinner>
      
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );

  if (fullScreen) {
    return (
      <LoadingOverlay>
        {loadingContent}
      </LoadingOverlay>
    );
  }

  return loadingContent;
};

Loading.displayName = 'Loading';
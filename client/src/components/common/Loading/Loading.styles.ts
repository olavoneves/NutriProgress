import styled, { css, keyframes } from 'styled-components';
import type { LoadingSize, LoadingVariant } from './Loading';

interface LoadingContainerProps {
  fullScreen: boolean;
}

interface LoadingSpinnerProps {
  size: LoadingSize;
  variant: LoadingVariant;
  color: string;
}

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(0.8);
    opacity: 1;
  }
`;

const pulseRing = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
`;

export const LoadingContainer = styled.div<LoadingContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  
  ${({ fullScreen }) => fullScreen && css`
    height: 100%;
  `}
`;

const sizeStyles = {
  small: css`
    width: 1.5rem;
    height: 1.5rem;
  `,
  
  medium: css`
    width: 2.5rem;
    height: 2.5rem;
  `,
  
  large: css`
    width: 4rem;
    height: 4rem;
  `,
};

export const LoadingSpinner = styled.div<LoadingSpinnerProps>`
  ${({ size }) => sizeStyles[size]}
  position: relative;
  
  ${({ variant, color }) => variant === 'spinner' && css`
    svg {
      width: 100%;
      height: 100%;
      animation: ${rotate} 1s linear infinite;
      
      circle {
        stroke: ${color};
        stroke-linecap: round;
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
        animation: dash 1.5s ease-in-out infinite;
      }
    }

    @keyframes dash {
      0% {
        stroke-dasharray: 1, 150;
        stroke-dashoffset: 0;
      }
      50% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -35;
      }
      100% {
        stroke-dasharray: 90, 150;
        stroke-dashoffset: -124;
      }
    }
  `}
  
  ${({ variant, color, size }) => variant === 'dots' && css`
    .dots {
      display: flex;
      gap: ${size === 'small' ? '0.25rem' : size === 'medium' ? '0.375rem' : '0.5rem'};
      
      .dot {
        width: ${size === 'small' ? '0.375rem' : size === 'medium' ? '0.5rem' : '0.75rem'};
        height: ${size === 'small' ? '0.375rem' : size === 'medium' ? '0.5rem' : '0.75rem'};
        background-color: ${color};
        border-radius: 50%;
        animation: ${bounce} 1.4s infinite ease-in-out both;
        
        &:nth-child(1) {
          animation-delay: -0.32s;
        }
        
        &:nth-child(2) {
          animation-delay: -0.16s;
        }
      }
    }
  `}
  
  ${({ variant, color }) => variant === 'pulse' && css`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &::before {
      content: '';
      width: 50%;
      height: 50%;
      background-color: ${color};
      border-radius: 50%;
      animation: ${pulse} 1.5s ease-in-out infinite;
    }
    
    .pulse-ring {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 3px solid ${color};
      border-radius: 50%;
      animation: ${pulseRing} 1.5s ease-out infinite;
    }
  `}
`;

export const LoadingText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  text-align: center;
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  backdrop-filter: blur(2px);
`;
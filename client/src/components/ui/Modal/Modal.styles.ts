import styled, { css, keyframes } from 'styled-components';
import type { ModalSize } from './Modal';

interface ModalContainerProps {
  size: ModalSize;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease-out;
  overflow-y: auto;
`;

const sizeStyles = {
  small: css`
    max-width: 400px;
  `,
  
  medium: css`
    max-width: 600px;
  `,
  
  large: css`
    max-width: 900px;
  `,
  
  full: css`
    max-width: 95vw;
    max-height: 95vh;
  `,
};

export const ModalContainer = styled.div<ModalContainerProps>`
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.3s ease-out;
  
  ${({ size }) => sizeStyles[size]}

  @media (max-width: 640px) {
    max-height: 95vh;
    border-radius: 0.5rem;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
`;

export const ModalTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.4;
`;

export const ModalCloseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: transparent;
  color: #6b7280;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;

  &:hover {
    background-color: #f3f4f6;
    color: #111827;
  }

  &:active {
    background-color: #e5e7eb;
  }

  &:focus-visible {
    outline: 2px solid #10b981;
    outline-offset: 2px;
  }

  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

export const ModalBody = styled.div`
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;

  /* Estilização da scrollbar */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }

  @media (max-width: 640px) {
    padding: 1rem;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1.25rem 1.5rem;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;

  @media (max-width: 640px) {
    flex-direction: column-reverse;
    gap: 0.5rem;

    button {
      width: 100%;
    }
  }
`;
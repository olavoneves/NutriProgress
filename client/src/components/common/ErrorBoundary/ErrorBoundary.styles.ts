import styled from 'styled-components';

export const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f9fafb;
`;

export const ErrorContent = styled.div`
  max-width: 42rem;
  width: 100%;
  background-color: #ffffff;
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;

  @media (max-width: 640px) {
    padding: 2rem 1.5rem;
  }
`;

export const ErrorIcon = styled.div`
  color: #ef4444;
  
  svg {
    width: 4rem;
    height: 4rem;
  }

  @media (max-width: 640px) {
    svg {
      width: 3rem;
      height: 3rem;
    }
  }
`;

export const ErrorTitle = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.2;

  @media (max-width: 640px) {
    font-size: 1.5rem;
  }
`;

export const ErrorMessage = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.6;
  max-width: 32rem;

  @media (max-width: 640px) {
    font-size: 0.938rem;
  }
`;

export const ErrorDetails = styled.div`
  width: 100%;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-top: 0.5rem;
  text-align: left;
  max-height: 300px;
  overflow-y: auto;

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
`;

export const ErrorCode = styled.div`
  font-size: 0.875rem;
  color: #374151;
  font-family: 'Courier New', monospace;
  margin-bottom: 0.75rem;

  &:last-child {
    margin-bottom: 0;
  }

  strong {
    color: #111827;
    font-weight: 600;
    display: block;
    margin-bottom: 0.25rem;
  }

  pre {
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
    padding: 0.5rem;
    background-color: #ffffff;
    border-radius: 0.25rem;
    border: 1px solid #e5e7eb;
    font-size: 0.75rem;
    line-height: 1.4;
  }
`;

export const ErrorActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;

    button {
      width: 100%;
    }
  }
`;
import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const ResultContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1.5rem;
  text-align: center;
  background-color: ${tokens.colors.gray[50]};
`;

export const ResultIcon = styled.div<{ $success: boolean }>`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ $success }) =>
    $success ? tokens.colors.primary[50] : tokens.colors.gray[100]};
  color: ${({ $success }) =>
    $success ? tokens.colors.brand : tokens.colors.gray[400]};

  svg { width: 2.5rem; height: 2.5rem; }
`;

export const ResultTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const ResultText = styled.p`
  font-size: ${tokens.typography.fontSize.base};
  color: ${tokens.colors.gray[500]};
  max-width: 440px;
  margin: 0;
  line-height: 1.6;
`;

export const ResultAction = styled.button`
  padding: 0.75rem 2rem;
  background-color: ${tokens.colors.brand};
  color: white;
  border: none;
  border-radius: ${tokens.borderRadius.lg};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  cursor: pointer;
  font-family: inherit;
  transition: ${tokens.transitions.normal};

  &:hover {
    background-color: ${tokens.colors.brandHover};
  }
`;

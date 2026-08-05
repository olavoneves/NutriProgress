import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const CardContainer = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
  cursor: pointer;
  transition: ${tokens.transitions.normal};

  &:hover {
    box-shadow: ${tokens.shadows.md};
    transform: translateY(-2px);
    border-color: ${tokens.colors.primary[200]};
  }

  &:active { transform: translateY(0); }

  &:focus-visible {
    outline: 2px solid ${tokens.colors.brand};
    outline-offset: 2px;
  }
`;

export const CardAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.bold};
  user-select: none;
  flex-shrink: 0;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  flex: 1;
`;

export const CardName = styled.h3`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CardMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const CardMetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[400]};

  svg { flex-shrink: 0; }
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding-top: 0.75rem;
  border-top: 1px solid ${tokens.colors.gray[100]};
`;

export const CardFooterItem = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[500]};
  font-weight: ${tokens.typography.fontWeight.medium};
`;

export const CardRestoreButton = styled.button`
  margin-left: auto;
  background: none;
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.md};
  padding: 0.25rem 0.625rem;
  font-family: inherit;
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.brand};
  cursor: pointer;
  transition: ${tokens.transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${tokens.colors.primary[50]};
    border-color: ${tokens.colors.brand};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

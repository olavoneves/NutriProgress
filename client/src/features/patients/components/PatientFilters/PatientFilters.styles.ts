import styled, { css } from 'styled-components';
import { tokens } from '@styles/tokens';

export const FiltersContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;

  > div:first-child { flex: 1; min-width: 200px; }
`;

export const FilterTabs = styled.div`
  display: flex;
  background-color: ${tokens.colors.gray[100]};
  border-radius: ${tokens.borderRadius.lg};
  padding: 0.25rem;
  gap: 0.125rem;
  flex-shrink: 0;
`;

export const FilterTab = styled.button<{ $active: boolean }>`
  padding: 0.375rem 0.875rem;
  border: none;
  border-radius: ${tokens.borderRadius.md};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  font-family: inherit;
  transition: ${tokens.transitions.fast};

  ${({ $active }) =>
    $active
      ? css`
          background-color: ${tokens.colors.white};
          color: ${tokens.colors.gray[900]};
          box-shadow: ${tokens.shadows.sm};
        `
      : css`
          background: none;
          color: ${tokens.colors.gray[500]};
          &:hover { color: ${tokens.colors.gray[700]}; }
        `}
`;

export const ResultCount = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[400]};
  white-space: nowrap;
  flex-shrink: 0;
`;

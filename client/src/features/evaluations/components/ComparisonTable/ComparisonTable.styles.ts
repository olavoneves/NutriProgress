import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const TableContainer = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  overflow: hidden;
`;

export const TableTitle = styled.h4`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[700]};
  margin: 0;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid ${tokens.colors.gray[100]};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: ${tokens.colors.gray[50]};
`;

export const TableBody = styled.tbody`
  tr:not(:last-child) {
    border-bottom: 1px solid ${tokens.colors.gray[50]};
  }

  tr:hover { background-color: ${tokens.colors.gray[50]}; }
`;

export const Th = styled.th<{ align?: string }>`
  padding: 0.625rem 1.25rem;
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[500]};
  text-align: ${({ align }) => align ?? 'left'};
  white-space: nowrap;

  small {
    font-weight: ${tokens.typography.fontWeight.normal};
    color: ${tokens.colors.gray[400]};
    font-size: 10px;
  }
`;

export const Td = styled.td<{ align?: string }>`
  padding: 0.75rem 1.25rem;
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[900]};
  text-align: ${({ align }) => align ?? 'left'};
`;

export const TdDiff = styled.td<{
  direction: 'good' | 'bad' | 'neutral';
  align?: string;
}>`
  padding: 0.75rem 1.25rem;
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  text-align: ${({ align }) => align ?? 'left'};
  color: ${({ direction }) =>
    direction === 'good'
      ? tokens.colors.success.dark
      : direction === 'bad'
      ? tokens.colors.error.dark
      : tokens.colors.gray[400]};

  .pct {
    font-size: ${tokens.typography.fontSize.xs};
    font-weight: ${tokens.typography.fontWeight.normal};
    margin-left: 0.25rem;
  }
`;

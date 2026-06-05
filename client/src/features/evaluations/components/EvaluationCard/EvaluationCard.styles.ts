import styled, { css } from 'styled-components';
import { tokens } from '@styles/tokens';

export const CardContainer = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  overflow: hidden;
  transition: ${tokens.transitions.normal};

  &:hover {
    box-shadow: ${tokens.shadows.sm};
    border-color: ${tokens.colors.primary[200]};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.25rem;
  background: linear-gradient(
    135deg,
    ${tokens.colors.primary[50]} 0%,
    ${tokens.colors.white} 100%
  );
  border-bottom: 1px solid ${tokens.colors.gray[100]};
`;

export const EvalNumber = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.primary[700]};
`;

export const EvalDate = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[400]};
`;

export const CardMetrics = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 1rem 1.25rem;
  gap: 0.75rem;
`;

export const CardMetricItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const CardMetricLabel = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[400]};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const CardMetricValue = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[900]};

  .classification {
    font-size: ${tokens.typography.fontSize.xs};
    font-weight: ${tokens.typography.fontWeight.normal};
    color: ${tokens.colors.gray[400]};
    margin-left: 0.25rem;
  }
`;

export const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border-top: 1px solid ${tokens.colors.gray[50]};
`;

export const ActionButton = styled.button<{ $danger?: boolean }>`
  background: none;
  border: none;
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  cursor: pointer;
  font-family: inherit;
  padding: 0.25rem 0.625rem;
  border-radius: ${tokens.borderRadius.md};
  transition: ${tokens.transitions.fast};

  ${({ $danger }) =>
    $danger
      ? css`
          color: ${tokens.colors.error.main};
          &:hover { background-color: ${tokens.colors.error.light}; }
        `
      : css`
          color: ${tokens.colors.brand};
          &:hover { background-color: ${tokens.colors.primary[50]}; }
        `}

  &:disabled { opacity: 0.4; cursor: not-allowed; }
`;

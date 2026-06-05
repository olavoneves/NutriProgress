import styled, { css, keyframes } from 'styled-components';
import { tokens } from '@styles/tokens';

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const skeleton = css`
  background: linear-gradient(
    90deg,
    ${tokens.colors.gray[100]} 25%,
    ${tokens.colors.gray[200]} 50%,
    ${tokens.colors.gray[100]} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${tokens.borderRadius.md};
`;

export const MetricCardContainer = styled.div<{ color: string }>`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-left: 4px solid ${({ color }) => color};
  border-radius: ${tokens.borderRadius.lg};
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;

  .skeleton-label {
    ${skeleton}
    width: 6rem;
    height: 0.875rem;
  }

  .skeleton-value {
    ${skeleton}
    width: 4rem;
    height: 2rem;
    margin-top: 0.25rem;
  }
`;

export const MetricLabel = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[500]};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const MetricValue = styled.span<{ $empty: boolean }>`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.extrabold};
  color: ${({ $empty }) =>
    $empty ? tokens.colors.gray[300] : tokens.colors.gray[900]};
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
`;

export const MetricUnit = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.gray[400]};
`;

export const MetricDiff = styled.span<{
  direction: 'good' | 'bad' | 'neutral';
}>`
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: ${({ direction }) =>
    direction === 'good'
      ? tokens.colors.success.dark
      : direction === 'bad'
      ? tokens.colors.error.dark
      : tokens.colors.gray[400]};

  .diff-label {
    font-weight: ${tokens.typography.fontWeight.normal};
    color: ${tokens.colors.gray[400]};
  }
`;

export const MetricClassification = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[400]};
  font-style: italic;
`;

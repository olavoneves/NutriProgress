import styled, { css, keyframes } from 'styled-components';
import { tokens } from '@styles/tokens';

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
`;

const skeletonBase = css`
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

export const ChartContainer = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .skeleton-title {
    ${skeletonBase}
    width: 10rem;
    height: 1.25rem;
    margin-bottom: 0.375rem;
  }

  .skeleton-subtitle {
    ${skeletonBase}
    width: 8rem;
    height: 0.875rem;
  }

  .skeleton-chart {
    ${skeletonBase}
    width: 100%;
    height: 200px;
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ChartTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[900]};
  margin: 0 0 0.25rem 0;
`;

export const ChartSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[400]};
  margin: 0;
`;

export const EmptyChart = styled.div`
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: ${tokens.colors.gray[300]};

  span {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.gray[400]};
  }
`;

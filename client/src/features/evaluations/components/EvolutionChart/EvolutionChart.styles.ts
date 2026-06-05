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

export const ChartContainer = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .skeleton-title {
    ${skeleton}
    width: 14rem;
    height: 1.25rem;
  }

  .skeleton-chart {
    ${skeleton}
    width: 100%;
    height: 280px;
  }
`;

export const ChartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const ChartTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const ChartTabs = styled.div`
  display: flex;
  gap: 0.375rem;
  flex-wrap: wrap;
`;

export const ChartTab = styled.button<{
  $active: boolean;
  $color: string;
}>`
  padding: 0.25rem 0.75rem;
  border-radius: ${tokens.borderRadius.full};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  cursor: pointer;
  font-family: inherit;
  border: 2px solid ${({ $color }) => $color};
  transition: ${tokens.transitions.fast};

  ${({ $active, $color }) =>
    $active
      ? css`
          background-color: ${$color};
          color: white;
        `
      : css`
          background: none;
          color: ${$color};
          &:hover { background-color: ${$color}20; }
        `}
`;

export const EmptyChart = styled.div`
  height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: ${tokens.colors.gray[300]};

  span {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.gray[400]};
    text-align: center;
  }
`;

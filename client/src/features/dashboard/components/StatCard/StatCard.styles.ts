import styled, { css, keyframes } from 'styled-components';
import { tokens } from '@styles/tokens';
import type { StatCardColor, StatCardTrendData } from './StatCard';

interface StatCardContainerProps {
  color: StatCardColor;
  $clickable: boolean;
}

interface StatCardIconProps {
  color: StatCardColor;
}

interface StatCardTrendProps {
  direction: StatCardTrendData['direction'];
}

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
`;

const skeletonStyle = css`
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

const colorMap: Record<StatCardColor, { icon: string; iconBg: string }> = {
  green:  { icon: tokens.colors.primary[600], iconBg: tokens.colors.primary[50] },
  blue:   { icon: tokens.colors.info.dark,    iconBg: tokens.colors.info.light },
  purple: { icon: '#7c3aed',                  iconBg: '#f5f3ff' },
  orange: { icon: tokens.colors.warning.dark, iconBg: tokens.colors.warning.light },
  red:    { icon: tokens.colors.error.dark,   iconBg: tokens.colors.error.light },
};

const topBorderColor: Record<StatCardColor, string> = {
  green:  tokens.colors.primary[600],
  blue:   tokens.colors.info.dark,
  purple: '#7c3aed',
  orange: tokens.colors.warning.dark,
  red:    tokens.colors.error.dark,
};

export const StatCardContainer = styled.div<StatCardContainerProps>`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: ${tokens.transitions.normal};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background-color: ${({ color }) => topBorderColor[color]};
    border-radius: ${tokens.borderRadius.xl} ${tokens.borderRadius.xl} 0 0;
  }

  ${({ $clickable }) =>
    $clickable &&
    css`
      cursor: pointer;
      user-select: none;

      &:hover {
        box-shadow: ${tokens.shadows.md};
        transform: translateY(-2px);
      }

      &:active {
        transform: translateY(0);
      }

      &:focus-visible {
        outline: 2px solid ${tokens.colors.brand};
        outline-offset: 2px;
      }
    `}

  .skeleton-icon {
    ${skeletonStyle}
    width: 3rem;
    height: 3rem;
    border-radius: ${tokens.borderRadius.lg};
  }

  .skeleton-value {
    ${skeletonStyle}
    width: 5rem;
    height: 2rem;
    margin-bottom: 0.25rem;
  }

  .skeleton-label {
    ${skeletonStyle}
    width: 8rem;
    height: 1rem;
  }
`;

export const StatCardIcon = styled.div<StatCardIconProps>`
  width: 3rem;
  height: 3rem;
  border-radius: ${tokens.borderRadius.lg};
  background-color: ${({ color }) => colorMap[color].iconBg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ color }) => colorMap[color].icon};

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const StatCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
`;

export const StatCardValue = styled.span`
  font-size: ${tokens.typography.fontSize['3xl']};
  font-weight: ${tokens.typography.fontWeight.extrabold};
  color: ${tokens.colors.gray[900]};
  line-height: 1;
`;

export const StatCardLabel = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.gray[500]};
`;

export const StatCardTrend = styled.div<StatCardTrendProps>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${({ direction }) =>
    direction === 'up'
      ? tokens.colors.success.dark
      : direction === 'down'
      ? tokens.colors.error.dark
      : tokens.colors.gray[500]};

  .trend-label {
    font-weight: ${tokens.typography.fontWeight.normal};
    color: ${tokens.colors.gray[400]};
  }
`;

export const StatCardFooter = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[400]};
  padding-top: 0.5rem;
  border-top: 1px solid ${tokens.colors.gray[100]};
`;

import styled from 'styled-components';
import { tokens } from '@styles/tokens';
import type { SubscriptionStatus } from '../../services';

export const CardContainer = styled.div<{ $color: string }>`
  background: linear-gradient(
    135deg,
    ${({ $color }) => $color}10 0%,
    ${tokens.colors.white} 100%
  );
  border: 1px solid ${({ $color }) => $color}30;
  border-radius: ${tokens.borderRadius.xl};
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const PlanBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: ${({ $color }) => $color};
  color: white;
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.bold};
  border-radius: ${tokens.borderRadius.full};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.5rem;
`;

export const CardTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0 0 0.25rem 0;
`;

export const CardSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
  margin: 0;
`;

export const StatusBadge = styled.span<{ $status: SubscriptionStatus }>`
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  padding: 0.375rem 0.75rem;
  border-radius: ${tokens.borderRadius.full};
  white-space: nowrap;
  flex-shrink: 0;

  ${({ $status }) => {
    switch ($status) {
      case 'ACTIVE':
        return `
          color: #15803d;
          background-color: #f0fdf4;
        `;
      case 'CANCELED':
        return `
          color: #b45309;
          background-color: #fffbeb;
        `;
      case 'EXPIRED':
        return `
          color: #6b7280;
          background-color: #f3f4f6;
        `;
      default:
        return `
          color: #1d4ed8;
          background-color: #eff6ff;
        `;
    }
  }}
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${tokens.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const InfoLabel = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[400]};
  font-weight: ${tokens.typography.fontWeight.medium};
  text-transform: uppercase;
  letter-spacing: 0.04em;
`;

export const InfoValue = styled.span`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  display: flex;
  align-items: baseline;
  gap: 0.25rem;

  span {
    font-size: ${tokens.typography.fontSize.sm};
    font-weight: ${tokens.typography.fontWeight.normal};
    color: ${tokens.colors.gray[500]};
  }
`;

export const CancelButton = styled.button`
  background: none;
  border: none;
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.error.main};
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  text-decoration: underline;
  transition: ${tokens.transitions.fast};
  align-self: flex-start;

  &:hover:not(:disabled) {
    color: ${tokens.colors.error.dark};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

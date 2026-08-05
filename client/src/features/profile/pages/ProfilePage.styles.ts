import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const PageHeader = styled.div`
  margin-bottom: 1.5rem;
`;

export const PageTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0 0 0.25rem 0;
`;

export const PageSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
  margin: 0;
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: ${tokens.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const MainColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
`;

export const AsideColumn = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  min-width: 0;
`;

export const Card = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  padding: 1.5rem;
`;

export const CardTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[700]};
  margin: 0 0 1.25rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${tokens.colors.gray[100]};
`;

export const AvatarBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid ${tokens.colors.gray[100]};
`;

export const Avatar = styled.div`
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: ${tokens.borderRadius.full};
  background-color: ${tokens.colors.brand};
  color: ${tokens.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.bold};
`;

export const AvatarInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;

  strong {
    font-size: ${tokens.typography.fontSize.base};
    font-weight: ${tokens.typography.fontWeight.semibold};
    color: ${tokens.colors.gray[900]};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span {
    font-size: ${tokens.typography.fontSize.xs};
    color: ${tokens.colors.gray[500]};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  small {
    font-size: ${tokens.typography.fontSize.xs};
    color: ${tokens.colors.gray[400]};
  }
`;

export const StatsRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding-top: 1.25rem;
`;

export const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
`;

export const StatValue = styled.span`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
`;

export const StatLabel = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[500]};
`;

export const PlanRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;

  small {
    font-size: ${tokens.typography.fontSize.xs};
    color: ${tokens.colors.gray[500]};
  }
`;

export const PlanBadge = styled.span<{ $color: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  border-radius: ${tokens.borderRadius.full};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.white};
  background-color: ${({ $color }) => $color};
`;

export const DangerZone = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.error.main};
  border-radius: ${tokens.borderRadius.xl};
  padding: 1.5rem;
`;

export const DangerTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.error.dark};
  margin: 0 0 1.25rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${tokens.colors.gray[100]};
`;

export const DangerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 0;
  flex-wrap: wrap;

  & + & {
    border-top: 1px solid ${tokens.colors.gray[100]};
  }

  &:last-child {
    padding-bottom: 0;
  }
`;

export const DangerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
  min-width: 240px;

  strong {
    font-size: ${tokens.typography.fontSize.sm};
    font-weight: ${tokens.typography.fontWeight.semibold};
    color: ${tokens.colors.gray[900]};
  }

  span {
    font-size: ${tokens.typography.fontSize.xs};
    color: ${tokens.colors.gray[500]};
    line-height: ${tokens.typography.lineHeight.relaxed};
  }
`;

export const DangerActions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    margin: 0;
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.gray[700]};
    line-height: ${tokens.typography.lineHeight.relaxed};
  }
`;

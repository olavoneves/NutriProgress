import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const LimitsContainer = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const LimitsTitle = styled.h4`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[700]};
  margin: 0;
`;

export const LimitRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const LimitLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.gray[600]};
  }
`;

export const LimitCount = styled.span<{
  $warning: boolean;
  $danger:  boolean;
}>`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${({ $danger, $warning }) =>
    $danger
      ? tokens.colors.error.main
      : $warning
      ? tokens.colors.warning.dark
      : tokens.colors.gray[900]};
`;

export const LimitBarWrapper = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${tokens.colors.gray[100]};
  border-radius: ${tokens.borderRadius.full};
  overflow: hidden;
`;

export const LimitBar = styled.div<{
  $percent: number;
  $color:   string;
}>`
  height: 100%;
  width: ${({ $percent }) => $percent}%;
  background-color: ${({ $color }) => $color};
  border-radius: ${tokens.borderRadius.full};
  transition: width 0.5s ease-in-out;
`;

export const LimitFeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
  list-style: none;
  padding: 0;
  margin: 0;
  padding-top: 0.75rem;
  border-top: 1px solid ${tokens.colors.gray[100]};
`;

export const LimitFeatureItem = styled.li<{ $included: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${tokens.typography.fontSize.xs};
  color: ${({ $included }) =>
    $included ? tokens.colors.gray[600] : tokens.colors.gray[300]};
`;

export const LimitFeatureIcon = styled.span<{ $included: boolean }>`
  font-size: 10px;
  font-weight: bold;
  color: ${({ $included }) =>
    $included ? tokens.colors.brand : tokens.colors.gray[300]};
  width: 14px;
  text-align: center;
`;

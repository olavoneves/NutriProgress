import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const BadgeContainer = styled.span<{ color: string; bg: string }>`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: ${tokens.borderRadius.full};
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${({ color }) => color};
  background-color: ${({ bg }) => bg};
  white-space: nowrap;
`;

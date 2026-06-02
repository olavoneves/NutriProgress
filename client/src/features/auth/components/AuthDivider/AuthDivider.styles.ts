import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

export const DividerLine = styled.div`
  flex: 1;
  height: 1px;
  background-color: ${tokens.colors.gray[200]};
`;

export const DividerText = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[400]};
  font-weight: ${tokens.typography.fontWeight.medium};
  white-space: nowrap;
`;

import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const LockIcon = styled.span`
  display: inline-flex;
  width: 16px;
  height: 16px;
  opacity: 0.6;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const UpsellContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.875rem;
  padding: 0.5rem 0;
`;

export const UpsellIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${tokens.colors.primary[50]};
  border-radius: ${tokens.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.brand};

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

export const UpsellTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const UpsellText = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
  margin: 0;
`;

export const UpsellFeatures = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0 0;
  width: 100%;
`;

export const UpsellFeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[700]};
  text-align: left;

  &::before {
    content: '✓';
    color: ${tokens.colors.brand};
    font-weight: bold;
    flex-shrink: 0;
  }
`;

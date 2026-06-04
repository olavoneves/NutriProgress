import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.gray[500]};
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: ${tokens.transitions.fast};

  &:hover { color: ${tokens.colors.gray[900]}; }
`;

export const PageHeader = styled.div`
  margin-bottom: 2rem;
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

export const FormCard = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  padding: 2rem;
  max-width: 800px;
`;

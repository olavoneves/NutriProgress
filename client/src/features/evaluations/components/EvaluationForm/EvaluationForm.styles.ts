import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormSectionTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[700]};
  margin: 0;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid ${tokens.colors.gray[100]};
`;

export const FormGrid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns ?? 2}, 1fr);
  gap: 1rem;

  @media (max-width: ${tokens.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid ${tokens.colors.gray[100]};

  @media (max-width: ${tokens.breakpoints.sm}) {
    flex-direction: column-reverse;

    button { width: 100%; }
  }
`;

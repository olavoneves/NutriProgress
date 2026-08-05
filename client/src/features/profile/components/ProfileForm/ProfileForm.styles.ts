import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGrid = styled.div<{ columns?: number }>`
  display: grid;
  grid-template-columns: repeat(${({ columns }) => columns ?? 2}, 1fr);
  gap: 1rem;

  @media (max-width: ${tokens.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
`;

export const SelectLabel = styled.label`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.gray[700]};
`;

export const SelectField = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.lg};
  font-family: inherit;
  font-size: ${tokens.typography.fontSize.base};
  color: ${tokens.colors.gray[900]};
  background-color: ${tokens.colors.white};
  outline: none;
  box-sizing: border-box;
  transition: ${tokens.transitions.fast};
  cursor: pointer;

  &:focus {
    border-color: ${tokens.colors.brand};
  }

  &:disabled {
    background-color: ${tokens.colors.gray[50]};
    color: ${tokens.colors.gray[400]};
    cursor: not-allowed;
  }
`;

export const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid ${tokens.colors.gray[100]};
`;

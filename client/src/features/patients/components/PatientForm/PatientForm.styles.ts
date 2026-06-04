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
  gap: 1.25rem;
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

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const SelectLabel = styled.label`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[700]};
`;

export const SelectField = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.lg};
  font-size: ${tokens.typography.fontSize.base};
  font-family: inherit;
  color: ${tokens.colors.gray[900]};
  background-color: ${tokens.colors.white};
  cursor: pointer;
  transition: ${tokens.transitions.normal};
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%236b7280' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;

  &:focus {
    outline: none;
    border-color: ${tokens.colors.brand};
    box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
  }
`;

export const TextareaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .error-msg {
    font-size: ${tokens.typography.fontSize.xs};
    color: ${tokens.colors.error.main};
  }
`;

export const TextareaLabel = styled.label`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[700]};
`;

export const TextareaField = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.lg};
  font-size: ${tokens.typography.fontSize.base};
  font-family: inherit;
  color: ${tokens.colors.gray[900]};
  resize: vertical;
  min-height: 80px;
  transition: ${tokens.transitions.normal};
  box-sizing: border-box;

  &::placeholder { color: ${tokens.colors.gray[400]}; }

  &:focus {
    outline: none;
    border-color: ${tokens.colors.brand};
    box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
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

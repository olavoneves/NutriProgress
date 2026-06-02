import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 100%;
`;

export const FormTitle = styled.h2`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const FormSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
  margin: 0;
  margin-top: -0.5rem;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

  &:hover {
    border-color: ${tokens.colors.gray[300]};
  }

  &:focus {
    outline: none;
    border-color: ${tokens.colors.brand};
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
  }
`;

export const CheckboxRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;

  input[type='checkbox'] {
    width: 1rem;
    height: 1rem;
    margin-top: 0.125rem;
    accent-color: ${tokens.colors.brand};
    cursor: pointer;
    flex-shrink: 0;
  }
`;

export const CheckboxLabel = styled.label`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[600]};
  cursor: pointer;
  line-height: 1.5;
`;

export const FormFooter = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
  text-align: center;
  margin: 0;
`;

export const FormLink = styled.a`
  color: ${tokens.colors.brand};
  font-weight: ${tokens.typography.fontWeight.semibold};
  text-decoration: none;

  &:hover {
    color: ${tokens.colors.brandHover};
    text-decoration: underline;
  }
`;

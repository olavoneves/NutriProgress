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
  cursor: pointer;

  &:hover {
    color: ${tokens.colors.brandHover};
    text-decoration: underline;
  }
`;

import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
  background-color: ${tokens.colors.gray[50]};
`;

export const NotFoundCode = styled.span`
  font-size: ${tokens.typography.fontSize['4xl']};
  font-weight: ${tokens.typography.fontWeight.extrabold};
  line-height: 1;
  color: ${tokens.colors.brand};
  letter-spacing: -0.03em;
`;

export const NotFoundTitle = styled.h1`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0.5rem 0 0 0;
`;

export const NotFoundText = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
  margin: 0 0 1.5rem 0;
  max-width: 26rem;
  line-height: ${tokens.typography.lineHeight.relaxed};
`;

export const NotFoundAction = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: ${tokens.borderRadius.lg};
  background-color: ${tokens.colors.brand};
  color: ${tokens.colors.white};
  font-family: inherit;
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  cursor: pointer;
  transition: ${tokens.transitions.fast};

  &:hover {
    background-color: ${tokens.colors.brandHover};
  }

  &:focus-visible {
    outline: 2px solid ${tokens.colors.brand};
    outline-offset: 2px;
  }
`;

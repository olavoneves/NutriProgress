import styled, { css } from 'styled-components';
import type { CardVariant, CardPadding } from './Card';

interface CardContainerProps {
  variant: CardVariant;
  padding: CardPadding;
  clickable: boolean;
  fullWidth: boolean;
}

const variantStyles = {
  default: css`
    background-color: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: none;
  `,

  outlined: css`
    background-color: ${({ theme }) => theme.colors.surface};
    border: 2px solid ${({ theme }) => theme.colors.primary[500]};
    box-shadow: none;
  `,

  elevated: css`
    background-color: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: ${({ theme }) => theme.shadows.md};
  `,
};

const paddingStyles = {
  none: css`
    padding: 0;
  `,

  small: css`
    padding: 0.75rem;
  `,

  medium: css`
    padding: 1.25rem;
  `,

  large: css`
    padding: 1.75rem;
  `,
};

export const CardContainer = styled.div<CardContainerProps>`
  border-radius: ${({ theme }) => theme.radii.xl};
  transition: all ${({ theme }) => theme.transitions.normal};
  
  ${({ variant }) => variantStyles[variant]}
  ${({ padding }) => paddingStyles[padding]}
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  ${({ clickable }) => clickable && css`
    cursor: pointer;
    user-select: none;

    &:hover {
      box-shadow: ${({ theme }) => theme.shadows.lg};
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }

    &:focus-visible {
      outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
      outline-offset: 2px;
    }
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`;

export const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.normal};
`;

export const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin: 0;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
`;
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
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: none;
  `,
  
  outlined: css`
    background-color: #ffffff;
    border: 2px solid #10b981;
    box-shadow: none;
  `,
  
  elevated: css`
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
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
  border-radius: 0.75rem;
  transition: all 0.2s ease-in-out;
  
  ${({ variant }) => variantStyles[variant]}
  ${({ padding }) => paddingStyles[padding]}
  
  ${({ fullWidth }) => fullWidth && css`
    width: 100%;
  `}

  ${({ clickable }) => clickable && css`
    cursor: pointer;
    user-select: none;

    &:hover {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
    }

    &:focus-visible {
      outline: 2px solid #10b981;
      outline-offset: 2px;
    }
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
  line-height: 1.4;
`;

export const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
`;
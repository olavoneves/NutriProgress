import styled, { css } from 'styled-components';
import { tokens } from '@styles/tokens';

export const CardContainer = styled.div<{
  $highlight: boolean;
  $color:     string;
  $current:   boolean;
}>`
  background-color: ${tokens.colors.white};
  border-radius: ${tokens.borderRadius.xl};
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  position: relative;
  transition: ${tokens.transitions.normal};

  ${({ $highlight, $color }) =>
    $highlight
      ? css`
          border: 2px solid ${$color};
          box-shadow: 0 0 0 4px ${$color}15;
        `
      : css`
          border: 1px solid ${tokens.colors.gray[200]};
        `}

  ${({ $current }) =>
    $current &&
    css`
      background-color: ${tokens.colors.gray[50]};
    `}

  &:hover {
    box-shadow: ${tokens.shadows.lg};
    transform: translateY(-2px);
  }
`;

export const CardBadge = styled.span<{ $color: string }>`
  position: absolute;
  top: -0.75rem;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${({ $color }) => $color};
  color: white;
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.bold};
  padding: 0.25rem 0.875rem;
  border-radius: ${tokens.borderRadius.full};
  white-space: nowrap;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    font-size: ${tokens.typography.fontSize.xl};
    font-weight: ${tokens.typography.fontWeight.bold};
    color: ${tokens.colors.gray[900]};
    margin: 0;
  }
`;

export const CardPriceTag = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.125rem;

  .currency {
    font-size: ${tokens.typography.fontSize.lg};
    font-weight: ${tokens.typography.fontWeight.semibold};
    color: ${tokens.colors.gray[600]};
    margin-top: 0.25rem;
  }
`;

export const CardPrice = styled.span`
  font-size: 2.5rem;
  font-weight: ${tokens.typography.fontWeight.extrabold};
  color: ${tokens.colors.gray[900]};
  line-height: 1;
`;

export const CardPriceSuffix = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[400]};
  margin-left: 0.125rem;
`;

export const CardDescription = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
  margin: 0;
`;

export const CardDivider = styled.hr`
  border: none;
  border-top: 1px solid ${tokens.colors.gray[100]};
  margin: 0;
`;

export const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  flex: 1;
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const FeatureItem = styled.li<{ $included: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-size: ${tokens.typography.fontSize.sm};
  color: ${({ $included }) =>
    $included ? tokens.colors.gray[700] : tokens.colors.gray[400]};
`;

export const FeatureIcon = styled.span<{ $included: boolean }>`
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${({ $included }) =>
    $included ? tokens.colors.primary[50] : tokens.colors.gray[100]};
  color: ${({ $included }) =>
    $included ? tokens.colors.brand : tokens.colors.gray[300]};

  svg {
    width: 0.625rem;
    height: 0.625rem;
  }
`;

export const CardAction = styled.button<{
  $variant: 'primary' | 'outline' | 'ghost';
  $color:   string;
}>`
  width: 100%;
  padding: 0.75rem;
  border-radius: ${tokens.borderRadius.lg};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  cursor: pointer;
  font-family: inherit;
  transition: ${tokens.transitions.normal};
  margin-top: auto;

  ${({ $variant, $color }) => {
    if ($variant === 'primary') return css`
      background-color: ${$color};
      color: white;
      border: 2px solid ${$color};
      &:hover:not(:disabled) {
        filter: brightness(0.9);
      }
    `;
    if ($variant === 'outline') return css`
      background: none;
      color: ${$color};
      border: 2px solid ${$color};
      &:hover:not(:disabled) {
        background-color: ${$color}10;
      }
    `;
    return css`
      background: none;
      color: ${tokens.colors.gray[400]};
      border: 2px solid ${tokens.colors.gray[200]};
      cursor: default;
    `;
  }}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const CurrentLabel = styled.div<{ $color: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.625rem;
  border-radius: ${tokens.borderRadius.lg};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${({ $color }) => $color};
  background-color: ${({ $color }) => $color}15;
  border: 2px solid ${({ $color }) => $color}30;
  margin-top: auto;

  svg { flex-shrink: 0; }
`;

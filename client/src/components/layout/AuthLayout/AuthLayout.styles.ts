import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const AuthLayoutContainer = styled.div`
  min-height: 100vh;
  display: flex;

  @media (max-width: ${tokens.breakpoints.md}) {
    flex-direction: column;
  }
`;

export const AuthLayoutLeft = styled.div`
  flex: 1;
  background: linear-gradient(
    135deg,
    ${tokens.colors.brand} 0%,
    ${tokens.colors.primary[700]} 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem;
  gap: 3rem;

  @media (max-width: ${tokens.breakpoints.lg}) {
    padding: 3rem 2rem;
  }

  @media (max-width: ${tokens.breakpoints.md}) {
    padding: 2rem;
    gap: 1.5rem;
    flex: 0;
  }
`;

export const AuthLayoutRight = styled.div`
  flex: 1;
  max-width: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: ${tokens.colors.white};
  overflow-y: auto;

  @media (max-width: ${tokens.breakpoints.md}) {
    max-width: 100%;
    flex: 1;
    align-items: flex-start;
    padding-top: 2rem;
  }
`;

export const AuthBrand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const AuthBrandLogo = styled.div`
  width: 64px;
  height: 64px;
`;

export const AuthBrandName = styled.h1`
  font-size: ${tokens.typography.fontSize['4xl']};
  font-weight: ${tokens.typography.fontWeight.extrabold};
  color: ${tokens.colors.white};
  margin: 0;
  line-height: 1;
`;

export const AuthBrandTagline = styled.p`
  font-size: ${tokens.typography.fontSize.lg};
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  line-height: 1.5;
  max-width: 400px;
`;

export const AuthFeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: ${tokens.breakpoints.md}) {
    display: none;
  }
`;

export const AuthFeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const AuthFeatureIcon = styled.span`
  font-size: 1.5rem;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(255, 255, 255, 0.15);
  border-radius: ${tokens.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const AuthFeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.125rem;

  strong {
    font-size: ${tokens.typography.fontSize.sm};
    font-weight: ${tokens.typography.fontWeight.semibold};
    color: ${tokens.colors.white};
  }

  span {
    font-size: ${tokens.typography.fontSize.xs};
    color: rgba(255, 255, 255, 0.75);
  }
`;

import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0 0 0.25rem 0;
`;

export const PageSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
  margin: 0;
`;

export const WelcomeBanner = styled.div`
  background: linear-gradient(
    135deg,
    ${tokens.colors.primary[50]} 0%,
    ${tokens.colors.primary[100]} 100%
  );
  border: 1px solid ${tokens.colors.primary[200]};
  border-radius: ${tokens.borderRadius.xl};
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const WelcomeBannerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const WelcomeBannerTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.primary[800]};
  margin: 0;
`;

export const WelcomeBannerSubtitle = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.primary[700]};
  margin: 0;
  max-width: 40rem;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${tokens.breakpoints.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${tokens.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: ${tokens.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
`;

export const ContentMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ContentAside = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

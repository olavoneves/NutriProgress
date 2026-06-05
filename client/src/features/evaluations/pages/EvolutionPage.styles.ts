import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const BackButton = styled.button`
  background: none;
  border: none;
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.gray[500]};
  cursor: pointer;
  font-family: inherit;
  padding: 0;
  margin-bottom: 1.5rem;
  transition: ${tokens.transitions.fast};

  &:hover { color: ${tokens.colors.gray[900]}; }
`;

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
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

export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;

  @media (max-width: ${tokens.breakpoints.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${tokens.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ChartsSection = styled.div`
  margin-bottom: 1.5rem;
`;

export const NoDataState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  gap: 1rem;
  text-align: center;

  p {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.gray[400]};
    margin: 0;
  }
`;

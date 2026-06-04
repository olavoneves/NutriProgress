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
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const PatientStatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const PageTitle = styled.h1`
  font-size: ${tokens.typography.fontSize['2xl']};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 340px 1fr;
  gap: 1.5rem;
  align-items: start;

  @media (max-width: ${tokens.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const ContentMain  = styled.div``;
export const ContentAside = styled.div``;

export const SectionCard = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  overflow: hidden;
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${tokens.colors.gray[100]};
`;

export const SectionTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const SectionAction = styled.button`
  background: none;
  border: none;
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  color: ${tokens.colors.brand};
  cursor: pointer;
  font-family: inherit;
  padding: 0.25rem 0.5rem;
  border-radius: ${tokens.borderRadius.md};
  transition: ${tokens.transitions.fast};

  &:hover { background-color: ${tokens.colors.primary[50]}; }
`;

export const EmptyEvaluations = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem 2rem;
  text-align: center;

  p {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.gray[400]};
    margin: 0;
  }
`;

export const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 4rem 2rem;
  text-align: center;

  p {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.error.dark};
  }
`;

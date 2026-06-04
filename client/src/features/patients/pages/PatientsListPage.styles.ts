import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
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

export const PatientsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-top: 1.5rem;

  @media (max-width: ${tokens.breakpoints.xl}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${tokens.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid ${tokens.colors.gray[100]};
`;

export const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.lg};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  background-color: ${tokens.colors.white};
  color: ${tokens.colors.gray[700]};
  font-family: inherit;
  transition: ${tokens.transitions.fast};

  &:hover:not(:disabled) {
    background-color: ${tokens.colors.gray[50]};
    border-color: ${tokens.colors.gray[300]};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const PaginationInfo = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  gap: 1rem;
  text-align: center;
  margin-top: 1.5rem;
`;

export const EmptyStateIcon = styled.div`
  width: 5rem;
  height: 5rem;
  background-color: ${tokens.colors.gray[100]};
  border-radius: ${tokens.borderRadius['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.gray[300]};

  svg { width: 2.5rem; height: 2.5rem; }
`;

export const EmptyStateTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const EmptyStateText = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[400]};
  margin: 0;
`;

export const ErrorState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background-color: ${tokens.colors.error.light};
  border-radius: ${tokens.borderRadius.xl};
  margin-top: 1.5rem;

  p {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.error.dark};
    margin: 0;
  }
`;

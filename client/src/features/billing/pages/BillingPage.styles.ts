import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const PageHeader = styled.div`
  margin-bottom: 2rem;
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

export const BillingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 2rem;
  align-items: start;

  @media (max-width: ${tokens.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

export const PlansSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const PlansSectionTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;

  @media (max-width: ${tokens.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const SidebarSection = styled.div`
  position: sticky;
  top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (max-width: ${tokens.breakpoints.lg}) {
    position: static;
  }
`;

export const ErrorState = styled.div`
  padding: 1rem;
  background-color: ${tokens.colors.error.light};
  border-radius: ${tokens.borderRadius.lg};
  margin-bottom: 1.5rem;

  p {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.error.dark};
    margin: 0;
  }
`;

export const FAQSection = styled.div`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid ${tokens.colors.gray[100]};
`;

export const FAQTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0 0 1.5rem 0;
`;

export const FAQList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: ${tokens.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const FAQItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FAQQuestion = styled.h4`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const FAQAnswer = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[500]};
  margin: 0;
  line-height: 1.6;
`;

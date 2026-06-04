import styled from 'styled-components';
import { tokens } from '@styles/tokens';

export const DetailCardContainer = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  overflow: hidden;
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    ${tokens.colors.primary[50]} 0%,
    ${tokens.colors.white} 100%
  );
  border-bottom: 1px solid ${tokens.colors.gray[100]};
`;

export const DetailAvatar = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  flex-shrink: 0;
`;

export const DetailHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  span {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.gray[500]};
  }
`;

export const DetailName = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.bold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const DetailSection = styled.div`
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${tokens.colors.gray[50]};

  &:last-child { border-bottom: none; }
`;

export const DetailSectionTitle = styled.h4`
  font-size: ${tokens.typography.fontSize.xs};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[400]};
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 0.875rem 0;
`;

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: ${tokens.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const DetailItemLabel = styled.span`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[400]};
  font-weight: ${tokens.typography.fontWeight.medium};
`;

export const DetailItemValue = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  color: ${tokens.colors.gray[900]};
  font-weight: ${tokens.typography.fontWeight.semibold};
`;

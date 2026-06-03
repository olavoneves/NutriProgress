import styled, { css, keyframes } from 'styled-components';
import { tokens } from '@styles/tokens';

const shimmer = keyframes`
  0%   { background-position: -200% 0; }
  100% { background-position:  200% 0; }
`;

const skeletonBase = css`
  background: linear-gradient(
    90deg,
    ${tokens.colors.gray[100]} 25%,
    ${tokens.colors.gray[200]} 50%,
    ${tokens.colors.gray[100]} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: ${tokens.borderRadius.md};
`;

export const ListContainer = styled.div`
  background-color: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.gray[200]};
  border-radius: ${tokens.borderRadius.xl};
  overflow: hidden;
`;

export const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid ${tokens.colors.gray[100]};
`;

export const ListTitle = styled.h3`
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[900]};
  margin: 0;
`;

export const ListAction = styled.button`
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

  &:hover {
    background-color: ${tokens.colors.primary[50]};
  }
`;

export const PatientItem = styled.div<{ $skeleton: boolean }>`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  cursor: ${({ $skeleton }) => ($skeleton ? 'default' : 'pointer')};
  transition: ${tokens.transitions.fast};
  border-bottom: 1px solid ${tokens.colors.gray[50]};

  &:last-child {
    border-bottom: none;
  }

  ${({ $skeleton }) =>
    !$skeleton &&
    css`
      &:hover {
        background-color: ${tokens.colors.gray[50]};
      }
    `}

  .skeleton-avatar {
    ${skeletonBase}
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .skeleton-name {
    ${skeletonBase}
    width: 8rem;
    height: 1rem;
    margin-bottom: 0.375rem;
  }

  .skeleton-meta {
    ${skeletonBase}
    width: 12rem;
    height: 0.75rem;
  }
`;

export const PatientAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.bold};
  flex-shrink: 0;
  user-select: none;
`;

export const PatientInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const PatientName = styled.p`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[900]};
  margin: 0 0 0.125rem 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PatientMeta = styled.p`
  font-size: ${tokens.typography.fontSize.xs};
  color: ${tokens.colors.gray[400]};
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PatientWeight = styled.span`
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.gray[700]};
  white-space: nowrap;
  flex-shrink: 0;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  gap: 0.75rem;
  text-align: center;

  p {
    font-size: ${tokens.typography.fontSize.sm};
    color: ${tokens.colors.gray[400]};
    margin: 0;
  }

  button {
    background: none;
    border: 1px solid ${tokens.colors.primary[200]};
    color: ${tokens.colors.brand};
    font-size: ${tokens.typography.fontSize.sm};
    font-weight: ${tokens.typography.fontWeight.semibold};
    cursor: pointer;
    font-family: inherit;
    padding: 0.5rem 1rem;
    border-radius: ${tokens.borderRadius.lg};
    transition: ${tokens.transitions.fast};

    &:hover {
      background-color: ${tokens.colors.primary[50]};
    }
  }
`;

export const EmptyIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${tokens.colors.gray[100]};
  border-radius: ${tokens.borderRadius.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${tokens.colors.gray[400]};

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

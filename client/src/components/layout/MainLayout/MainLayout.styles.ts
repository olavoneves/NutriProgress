import styled, { css } from 'styled-components';

interface ContentAreaProps {
  hideHeader: boolean;
}

interface ContentContainerProps {
  contentPadding: boolean;
  maxWidth: string;
}

export const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LayoutWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

export const ContentArea = styled.main<ContentAreaProps>`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  
  ${({ hideHeader, theme }) => hideHeader ? css`
    height: 100vh;
  ` : css`
    height: calc(100vh - ${theme.layout.headerHeight});
  `}

  /* Estilização da scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[100]};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const ContentContainer = styled.div<ContentContainerProps>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  margin: 0 auto;
  
  ${({ contentPadding, theme }) => contentPadding && css`
    padding: ${theme.spacing.xl} ${theme.spacing.lg};

    @media (max-width: ${theme.breakpoints.md}) {
      padding: ${theme.spacing.lg} ${theme.spacing.md};
    }

    @media (max-width: ${theme.breakpoints.sm}) {
      padding: ${theme.spacing.md} 0.75rem;
    }
  `}
`;
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
  background-color: #f9fafb;
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
  
  ${({ hideHeader }) => hideHeader ? css`
    height: 100vh;
  ` : css`
    height: calc(100vh - 4rem); /* 4rem = altura do header */
  `}

  /* Estilização da scrollbar */
  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f3f4f6;
  }

  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9ca3af;
  }
`;

export const ContentContainer = styled.div<ContentContainerProps>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth};
  margin: 0 auto;
  
  ${({ contentPadding }) => contentPadding && css`
    padding: 2rem 1.5rem;

    @media (max-width: 768px) {
      padding: 1.5rem 1rem;
    }

    @media (max-width: 480px) {
      padding: 1rem 0.75rem;
    }
  `}
`;
import { css } from 'styled-components';

export const customScrollbar = (width: number = 8) => css`
  &::-webkit-scrollbar {
    width: ${width}px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[100]};
    border-radius: ${width / 2}px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: ${width / 2}px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.colors.gray[400]};
  }
`;

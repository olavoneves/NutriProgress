import React from 'react';
import { DividerContainer, DividerLine, DividerText } from './AuthDivider.styles';

interface AuthDividerProps {
  text?: string;
}

export const AuthDivider: React.FC<AuthDividerProps> = ({ text = 'ou' }) => (
  <DividerContainer>
    <DividerLine />
    <DividerText>{text}</DividerText>
    <DividerLine />
  </DividerContainer>
);

AuthDivider.displayName = 'AuthDivider';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.primary[900]} 0%,
    ${({ theme }) => theme.colors.primary[700]} 35%,
    ${({ theme }) => theme.colors.primary[500]} 100%
  );
  position: relative;
  overflow: hidden;

  /* Decorative circles */
  &::before {
    content: '';
    position: absolute;
    width: 600px;
    height: 600px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.03);
    top: -200px;
    right: -100px;
  }

  &::after {
    content: '';
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    bottom: -150px;
    left: -100px;
  }
`;

export const LoginLeft = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  color: ${({ theme }) => theme.colors.white};
  position: relative;
  z-index: 1;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const BrandTitle = styled.h1`
  font-size: 3rem;
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: ${({ theme }) => theme.typography.lineHeight.tight};
  animation: ${fadeIn} 0.6s ease-out;
`;

export const BrandSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  opacity: 0.85;
  max-width: 480px;
  line-height: ${({ theme }) => theme.typography.lineHeight.relaxed};
  animation: ${fadeIn} 0.6s ease-out 0.15s both;
`;

export const FeatureList = styled.ul`
  margin-top: ${({ theme }) => theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  animation: ${fadeIn} 0.6s ease-out 0.3s both;
`;

export const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: ${({ theme }) => theme.typography.fontSize.base};
  opacity: 0.9;

  svg {
    flex-shrink: 0;
    width: 1.25rem;
    height: 1.25rem;
    color: ${({ theme }) => theme.colors.primary[200]};
  }
`;

export const LoginRight = styled.div`
  width: 520px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.surface};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing['2xl']};
  position: relative;
  z-index: 1;
  box-shadow: -10px 0 40px rgba(0, 0, 0, 0.15);
  animation: ${fadeIn} 0.5s ease-out;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: 100%;
    box-shadow: none;
  }
`;

export const FormHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

export const FormLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  svg {
    width: 2.5rem;
    height: 2.5rem;
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`;

export const FormLogoText = styled.span`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

export const FormTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize['2xl']};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const FormSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const ForgotPassword = styled.a`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.primary[500]};
  text-align: right;
  cursor: pointer;
  margin-top: -${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  transition: color ${({ theme }) => theme.transitions.fast};

  &:hover {
    color: ${({ theme }) => theme.colors.primary[600]};
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => theme.spacing.sm} 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.colors.border};
  }

  span {
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  }
`;

export const RegisterLink = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-top: ${({ theme }) => theme.spacing.md};

  a {
    color: ${({ theme }) => theme.colors.primary[500]};
    font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
    cursor: pointer;
    transition: color ${({ theme }) => theme.transitions.fast};

    &:hover {
      color: ${({ theme }) => theme.colors.primary[600]};
    }
  }
`;

export const Footer = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.spacing.lg};
  left: 0;
  right: 0;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.disabled};
`;

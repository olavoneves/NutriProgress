import React from 'react';
import {
  AuthLayoutContainer,
  AuthLayoutLeft,
  AuthLayoutRight,
  AuthBrand,
  AuthBrandLogo,
  AuthBrandName,
  AuthBrandTagline,
  AuthFeatureList,
  AuthFeatureItem,
  AuthFeatureIcon,
  AuthFeatureText,
} from './AuthLayout.styles';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const features = [
  {
    icon: '📊',
    title: 'Gráficos de Evolução',
    description: 'Visualize o progresso dos seus pacientes',
  },
  {
    icon: '👥',
    title: 'Gestão de Pacientes',
    description: 'Organize e acompanhe todos os seus pacientes',
  },
  {
    icon: '📋',
    title: 'Avaliações Detalhadas',
    description: 'Registre medidas e composição corporal',
  },
  {
    icon: '🔒',
    title: 'Seguro e Confiável',
    description: 'Seus dados protegidos com criptografia',
  },
];

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <AuthLayoutContainer>
      <AuthLayoutLeft>
        <AuthBrand>
          <AuthBrandLogo>
            <svg
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="48" height="48" rx="12" fill="white" fillOpacity="0.2" />
              <path
                d="M24 12L34 18V30L24 36L14 30V18L24 12Z"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="24" cy="24" r="5" fill="white" />
            </svg>
          </AuthBrandLogo>
          <AuthBrandName>NutriProgress</AuthBrandName>
          <AuthBrandTagline>
            A plataforma inteligente para acompanhamento nutricional
          </AuthBrandTagline>
        </AuthBrand>

        <AuthFeatureList>
          {features.map((feature) => (
            <AuthFeatureItem key={feature.title}>
              <AuthFeatureIcon>{feature.icon}</AuthFeatureIcon>
              <AuthFeatureText>
                <strong>{feature.title}</strong>
                <span>{feature.description}</span>
              </AuthFeatureText>
            </AuthFeatureItem>
          ))}
        </AuthFeatureList>
      </AuthLayoutLeft>

      <AuthLayoutRight>{children}</AuthLayoutRight>
    </AuthLayoutContainer>
  );
};

AuthLayout.displayName = 'AuthLayout';

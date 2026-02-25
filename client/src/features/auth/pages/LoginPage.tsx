import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { Input } from '@components/ui/Input';
import { ROUTES } from '@/routes/routes.config';
import {
    LoginContainer,
    LoginLeft,
    BrandTitle,
    BrandSubtitle,
    FeatureList,
    FeatureItem,
    LoginRight,
    FormHeader,
    FormLogo,
    FormLogoText,
    FormTitle,
    FormSubtitle,
    Form,
    ForgotPassword,
    RegisterLink,
    Footer,
} from './LoginPage.styles';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // TODO: integrar com AuthContext.login()
        setTimeout(() => {
            setIsLoading(false);
            navigate(ROUTES.DASHBOARD);
        }, 1500);
    };

    return (
        <LoginContainer>
            {/* Left — Branding */}
            <LoginLeft>
                <BrandTitle>
                    Acompanhamento
                    <br />
                    Antropométrico
                </BrandTitle>
                <BrandSubtitle>
                    Plataforma completa para nutricionistas gerenciarem
                    avaliações e acompanharem a evolução de seus pacientes.
                </BrandSubtitle>

                <FeatureList>
                    <FeatureItem>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Cadastro e gestão de pacientes
                    </FeatureItem>
                    <FeatureItem>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Avaliações antropométricas completas
                    </FeatureItem>
                    <FeatureItem>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Gráficos de evolução e relatórios
                    </FeatureItem>
                    <FeatureItem>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        Cálculos automáticos de IMC e composição
                    </FeatureItem>
                </FeatureList>
            </LoginLeft>

            {/* Right — Form */}
            <LoginRight>
                <FormHeader>
                    <FormLogo>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                        <FormLogoText>NutriProgress</FormLogoText>
                    </FormLogo>
                    <FormTitle>Entrar na sua conta</FormTitle>
                    <FormSubtitle>
                        Insira seus dados para acessar o painel
                    </FormSubtitle>
                </FormHeader>

                <Form onSubmit={handleSubmit}>
                    <Input
                        type="email"
                        label="E-mail"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        leftIcon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="2" y="4" width="20" height="16" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                            </svg>
                        }
                    />

                    <Input
                        type="password"
                        label="Senha"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        leftIcon={
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                        }
                    />

                    <ForgotPassword>Esqueceu a senha?</ForgotPassword>

                    <Button
                        variant="primary"
                        size="large"
                        fullWidth
                        type="submit"
                        isLoading={isLoading}
                    >
                        Entrar
                    </Button>
                </Form>

                <RegisterLink>
                    Não tem uma conta?{' '}
                    <a onClick={() => navigate(ROUTES.REGISTER)}>Criar conta</a>
                </RegisterLink>

                <Footer>
                    © 2026 NutriProgress — Todos os direitos reservados
                </Footer>
            </LoginRight>
        </LoginContainer>
    );
};

LoginPage.displayName = 'LoginPage';

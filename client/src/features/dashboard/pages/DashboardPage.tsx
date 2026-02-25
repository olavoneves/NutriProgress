import { Card } from '@components/ui/Card';
import {
    PageHeader,
    PageTitle,
    PageSubtitle,
    StatsGrid,
    StatCard,
    StatIcon,
    StatContent,
    StatValue,
    StatLabel,
    StatChange,
    ContentGrid,
    SectionTitle,
    ActivityList,
    ActivityItem,
    ActivityDot,
    ActivityContent,
    ActivityText,
    ActivityTime,
    QuickActions,
    QuickActionButton,
    EmptyChart,
} from './DashboardPage.styles';

export const DashboardPage: React.FC = () => {
    return (
        <>
            <PageHeader>
                <PageTitle>Dashboard</PageTitle>
                <PageSubtitle>
                    Bem-vindo de volta! Aqui está um resumo da sua atividade.
                </PageSubtitle>
            </PageHeader>

            {/* Stats Cards */}
            <StatsGrid>
                <StatCard>
                    <StatIcon $color="primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </StatIcon>
                    <StatContent>
                        <StatValue>24</StatValue>
                        <StatLabel>Pacientes ativos</StatLabel>
                        <StatChange $positive={true}>+3 este mês</StatChange>
                    </StatContent>
                </StatCard>

                <StatCard>
                    <StatIcon $color="info">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </StatIcon>
                    <StatContent>
                        <StatValue>8</StatValue>
                        <StatLabel>Avaliações este mês</StatLabel>
                        <StatChange $positive={true}>+12%</StatChange>
                    </StatContent>
                </StatCard>

                <StatCard>
                    <StatIcon $color="warning">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </StatIcon>
                    <StatContent>
                        <StatValue>5</StatValue>
                        <StatLabel>Pendentes esta semana</StatLabel>
                        <StatChange $positive={false}>2 atrasadas</StatChange>
                    </StatContent>
                </StatCard>

                <StatCard>
                    <StatIcon $color="primary">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="20" x2="18" y2="10" />
                            <line x1="12" y1="20" x2="12" y2="4" />
                            <line x1="6" y1="20" x2="6" y2="14" />
                        </svg>
                    </StatIcon>
                    <StatContent>
                        <StatValue>156</StatValue>
                        <StatLabel>Total de avaliações</StatLabel>
                        <StatChange $positive={true}>+8% vs. mês anterior</StatChange>
                    </StatContent>
                </StatCard>
            </StatsGrid>

            {/* Content Grid */}
            <ContentGrid>
                {/* Left — Activity & Chart */}
                <div>
                    <Card variant="default" padding="medium">
                        <Card.Header>
                            <Card.Title>Evolução de Avaliações</Card.Title>
                            <Card.Description>Número de avaliações realizadas nos últimos 6 meses</Card.Description>
                        </Card.Header>
                        <Card.Body>
                            <EmptyChart>📊 Gráfico será integrado aqui</EmptyChart>
                        </Card.Body>
                    </Card>

                    <div style={{ marginTop: '1.5rem' }}>
                        <SectionTitle>Atividade Recente</SectionTitle>
                        <ActivityList>
                            <ActivityItem>
                                <ActivityDot $color="#10b981" />
                                <ActivityContent>
                                    <ActivityText>Avaliação de Maria Silva concluída</ActivityText>
                                    <ActivityTime>Há 2 horas</ActivityTime>
                                </ActivityContent>
                            </ActivityItem>
                            <ActivityItem>
                                <ActivityDot $color="#3b82f6" />
                                <ActivityContent>
                                    <ActivityText>Novo paciente cadastrado: João Oliveira</ActivityText>
                                    <ActivityTime>Há 5 horas</ActivityTime>
                                </ActivityContent>
                            </ActivityItem>
                            <ActivityItem>
                                <ActivityDot $color="#f59e0b" />
                                <ActivityContent>
                                    <ActivityText>Avaliação agendada: Ana Costa — amanhã 14:00</ActivityText>
                                    <ActivityTime>Ontem</ActivityTime>
                                </ActivityContent>
                            </ActivityItem>
                            <ActivityItem>
                                <ActivityDot $color="#10b981" />
                                <ActivityContent>
                                    <ActivityText>Avaliação de Pedro Santos concluída</ActivityText>
                                    <ActivityTime>2 dias atrás</ActivityTime>
                                </ActivityContent>
                            </ActivityItem>
                        </ActivityList>
                    </div>
                </div>

                {/* Right — Quick Actions */}
                <div>
                    <Card variant="default" padding="medium">
                        <Card.Header>
                            <Card.Title>Ações Rápidas</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <QuickActions>
                                <QuickActionButton>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <line x1="19" y1="8" x2="19" y2="14" />
                                        <line x1="22" y1="11" x2="16" y2="11" />
                                    </svg>
                                    Novo paciente
                                </QuickActionButton>
                                <QuickActionButton>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                        <line x1="12" y1="18" x2="12" y2="12" />
                                        <line x1="9" y1="15" x2="15" y2="15" />
                                    </svg>
                                    Nova avaliação
                                </QuickActionButton>
                                <QuickActionButton>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="20" x2="18" y2="10" />
                                        <line x1="12" y1="20" x2="12" y2="4" />
                                        <line x1="6" y1="20" x2="6" y2="14" />
                                    </svg>
                                    Ver relatórios
                                </QuickActionButton>
                            </QuickActions>
                        </Card.Body>
                    </Card>

                    <div style={{ marginTop: '1.5rem' }}>
                        <Card variant="outlined" padding="medium">
                            <Card.Header>
                                <Card.Title>Próximas Consultas</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <ActivityList>
                                    <ActivityItem>
                                        <ActivityDot $color="#3b82f6" />
                                        <ActivityContent>
                                            <ActivityText>Ana Costa</ActivityText>
                                            <ActivityTime>Amanhã — 14:00</ActivityTime>
                                        </ActivityContent>
                                    </ActivityItem>
                                    <ActivityItem>
                                        <ActivityDot $color="#3b82f6" />
                                        <ActivityContent>
                                            <ActivityText>Carlos Mendes</ActivityText>
                                            <ActivityTime>Qui — 09:30</ActivityTime>
                                        </ActivityContent>
                                    </ActivityItem>
                                    <ActivityItem>
                                        <ActivityDot $color="#3b82f6" />
                                        <ActivityContent>
                                            <ActivityText>Fernanda Lima</ActivityText>
                                            <ActivityTime>Sex — 16:00</ActivityTime>
                                        </ActivityContent>
                                    </ActivityItem>
                                </ActivityList>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </ContentGrid>
        </>
    );
};

DashboardPage.displayName = 'DashboardPage';

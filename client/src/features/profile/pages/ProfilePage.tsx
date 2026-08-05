import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@components/common/Loading';
import { Button } from '@components/ui/Button';
import { Modal } from '@components/ui/Modal';
import { Input } from '@components/ui/Input';
import { useNutritionist } from '../hooks';
import { useProfile } from '../hooks/useProfile';
import { ProfileForm } from '../components/ProfileForm';
import { PLANS_CONFIG } from '@features/billing';
import { ROUTES } from '@routes/routes.config';
import { formatDate } from '@utils/formatters';
import type { ProfileSchema } from '../components/ProfileForm';
import {
  PageHeader,
  PageTitle,
  PageSubtitle,
  ProfileGrid,
  MainColumn,
  AsideColumn,
  Card,
  CardTitle,
  AvatarBlock,
  Avatar,
  AvatarInfo,
  StatsRow,
  StatItem,
  StatValue,
  StatLabel,
  PlanRow,
  PlanBadge,
  DangerZone,
  DangerTitle,
  DangerItem,
  DangerText,
  DangerActions,
  ModalContent,
} from './ProfilePage.styles';

const CONFIRM_WORD = 'EXCLUIR';

const getInitials = (name: string) =>
  name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { nutritionist, isLoading, refetch } = useNutritionist();
  const {
    updateProfile,
    exportMyData,
    deleteAccount,
    isSaving,
    isExporting,
    isDeleting,
  } = useProfile(refetch);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [confirmText, setConfirmText]         = useState('');

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setConfirmText('');
  };

  const handleSubmit = async (data: ProfileSchema) => {
    await updateProfile({
      fullName:   data.fullName,
      phone:      data.phone      || undefined,
      crn:        data.crn        || undefined,
      specialty:  data.specialty  || undefined,
      clinicName: data.clinicName || undefined,
    });
  };

  if (isLoading || !nutritionist) {
    return <Loading text="Carregando perfil..." />;
  }

  const planConfig = PLANS_CONFIG.find(
    (plan) => plan.name === nutritionist.subscriptionPlan
  );

  return (
    <>
      <PageHeader>
        <PageTitle>Meu Perfil</PageTitle>
        <PageSubtitle>
          Gerencie seus dados profissionais e privacidade
        </PageSubtitle>
      </PageHeader>

      <ProfileGrid>
        <MainColumn>
          <Card>
            <CardTitle>Dados Profissionais</CardTitle>
            <ProfileForm
              profile={nutritionist}
              onSubmit={handleSubmit}
              isLoading={isSaving}
            />
          </Card>

          <DangerZone>
            <DangerTitle>Privacidade e Dados</DangerTitle>

            <DangerItem>
              <DangerText>
                <strong>Exportar meus dados</strong>
                <span>
                  Baixe um arquivo com todos os seus dados pessoais,
                  assinaturas e histórico de pagamentos (LGPD Art. 15).
                </span>
              </DangerText>
              <DangerActions>
                <Button
                  variant="outline"
                  size="small"
                  onClick={exportMyData}
                  isLoading={isExporting}
                >
                  Exportar
                </Button>
              </DangerActions>
            </DangerItem>

            <DangerItem>
              <DangerText>
                <strong>Excluir minha conta</strong>
                <span>
                  Remove permanentemente seu acesso. Esta ação não pode
                  ser desfeita (LGPD Art. 18, VI).
                </span>
              </DangerText>
              <DangerActions>
                <Button
                  variant="danger"
                  size="small"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Excluir conta
                </Button>
              </DangerActions>
            </DangerItem>
          </DangerZone>
        </MainColumn>

        <AsideColumn>
          <Card>
            <AvatarBlock>
              <Avatar>{getInitials(nutritionist.fullName)}</Avatar>
              <AvatarInfo>
                <strong>{nutritionist.fullName}</strong>
                <span>{nutritionist.email}</span>
                {nutritionist.crn && <small>{nutritionist.crn}</small>}
              </AvatarInfo>
            </AvatarBlock>

            <StatsRow>
              <StatItem>
                <StatValue>{nutritionist.stats.activePatients}</StatValue>
                <StatLabel>Pacientes ativos</StatLabel>
              </StatItem>
              <StatItem>
                <StatValue>{nutritionist.stats.totalEvaluations}</StatValue>
                <StatLabel>Avaliações</StatLabel>
              </StatItem>
            </StatsRow>
          </Card>

          <Card>
            <CardTitle>Plano Atual</CardTitle>
            <PlanRow>
              <PlanBadge $color={planConfig?.color ?? '#6b7280'}>
                {planConfig?.label ?? nutritionist.subscriptionPlan}
              </PlanBadge>
              {nutritionist.subscriptionExpiresAt && (
                <small>
                  Renova em {formatDate(nutritionist.subscriptionExpiresAt)}
                </small>
              )}
            </PlanRow>
            <Button
              variant="outline"
              fullWidth
              onClick={() => navigate(ROUTES.BILLING)}
            >
              Gerenciar assinatura
            </Button>
          </Card>
        </AsideColumn>
      </ProfileGrid>

      <Modal
        isOpen={showDeleteModal}
        onClose={closeDeleteModal}
        title="Excluir Conta"
        size="small"
        footer={
          <>
            <Button variant="secondary" onClick={closeDeleteModal}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={deleteAccount}
              isLoading={isDeleting}
              disabled={confirmText !== CONFIRM_WORD}
            >
              Excluir permanentemente
            </Button>
          </>
        }
      >
        <ModalContent>
          <p>
            Esta ação é <strong>irreversível</strong>. Todos os seus dados
            e dos seus pacientes serão removidos.
          </p>
          <Input
            label={`Digite "${CONFIRM_WORD}" para confirmar`}
            value={confirmText}
            onChange={(e) => setConfirmText(e.target.value)}
            placeholder={CONFIRM_WORD}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfilePage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@components/ui/Button';
import { Modal } from '@components/ui/Modal';
import { ROUTES } from '@routes/routes.config';
import { useExportPdf } from '../../hooks';
import {
  LockIcon,
  UpsellContent,
  UpsellIcon,
  UpsellTitle,
  UpsellText,
  UpsellFeatures,
  UpsellFeatureItem,
} from './ExportPdfButton.styles';

interface ExportPdfButtonProps {
  patientId:   string;
  patientName: string;
  /** Se o plano atual permite exportar (vem de useBilling) */
  hasFeature?: boolean;
  /** Desabilita quando o paciente não tem avaliações */
  disabled?:   boolean;
  variant?:    'primary' | 'outline';
}

const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const LockedIcon = () => (
  <LockIcon>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  </LockIcon>
);

export const ExportPdfButton: React.FC<ExportPdfButtonProps> = ({
  patientId,
  patientName,
  hasFeature = true,
  disabled = false,
  variant = 'outline',
}) => {
  const navigate = useNavigate();
  const {
    exportPdf,
    isExporting,
    showUpsellModal,
    requiredPlan,
    closeUpsell,
    openUpsell,
  } = useExportPdf();

  // Sem a feature, o clique nunca chega à API: abre o upsell direto.
  // O 402 continua tratado no hook como rede de segurança, caso o plano
  // mude entre o carregamento da página e o clique.
  const handleClick = () => {
    if (!hasFeature) {
      openUpsell();
      return;
    }
    void exportPdf(patientId, patientName);
  };

  return (
    <>
      <Button
        variant={variant}
        onClick={handleClick}
        isLoading={isExporting}
        disabled={disabled || isExporting}
        title={
          disabled
            ? 'Cadastre ao menos uma avaliação para gerar o relatório'
            : undefined
        }
        leftIcon={hasFeature ? <DownloadIcon /> : <LockedIcon />}
      >
        Exportar PDF
      </Button>

      <Modal
        isOpen={showUpsellModal}
        onClose={closeUpsell}
        size="small"
        showCloseButton
        footer={
          <>
            <Button variant="secondary" onClick={closeUpsell}>
              Agora não
            </Button>
            <Button variant="primary" onClick={() => navigate(ROUTES.BILLING)}>
              Ver planos
            </Button>
          </>
        }
      >
        <UpsellContent>
          <UpsellIcon>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
            </svg>
          </UpsellIcon>

          <UpsellTitle>
            Relatório em PDF é uma funcionalidade paga
          </UpsellTitle>

          <UpsellText>
            Gere relatórios profissionais que você pode enviar diretamente aos
            seus pacientes. Disponível a partir do plano{' '}
            <strong>{requiredPlan ?? 'STARTER'}</strong>.
          </UpsellText>

          <UpsellFeatures>
            <UpsellFeatureItem>
              Gráficos de evolução prontos para compartilhar
            </UpsellFeatureItem>
            <UpsellFeatureItem>
              Assinado com seu nome, CRN e clínica
            </UpsellFeatureItem>
            <UpsellFeatureItem>
              Histórico completo das avaliações
            </UpsellFeatureItem>
          </UpsellFeatures>
        </UpsellContent>
      </Modal>
    </>
  );
};

ExportPdfButton.displayName = 'ExportPdfButton';

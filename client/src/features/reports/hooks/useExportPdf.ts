import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import type { ApiError } from '@/@types';
import { reportService } from '../services';

interface UseExportPdfReturn {
  exportPdf:       (patientId: string, patientName: string) => Promise<void>;
  isExporting:     boolean;
  showUpsellModal: boolean;
  requiredPlan:    string | null;
  openUpsell:      () => void;
  closeUpsell:     () => void;
}

/** 402 Payment Required — o plano atual nao inclui a feature. */
const HTTP_PAYMENT_REQUIRED = 402;

export const useExportPdf = (): UseExportPdfReturn => {
  const [isExporting,     setIsExporting]     = useState(false);
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [requiredPlan,    setRequiredPlan]    = useState<string | null>(null);

  const openUpsell  = useCallback(() => setShowUpsellModal(true), []);
  const closeUpsell = useCallback(() => setShowUpsellModal(false), []);

  const exportPdf = useCallback(
    async (patientId: string, patientName: string) => {
      setIsExporting(true);
      const toastId = toast.loading('Gerando relatório...');

      try {
        await reportService.downloadPatientReport(patientId, patientName);
        toast.success('Relatório gerado com sucesso!', { id: toastId });
      } catch (err: unknown) {
        const apiError = err as ApiError;

        if (apiError?.status === HTTP_PAYMENT_REQUIRED) {
          toast.dismiss(toastId);
          setRequiredPlan(apiError.errors?.requiredPlan ?? 'STARTER');
          setShowUpsellModal(true);
        } else {
          toast.error(
            apiError?.message ?? 'Erro ao gerar relatório',
            { id: toastId }
          );
        }
      } finally {
        setIsExporting(false);
      }
    },
    []
  );

  return {
    exportPdf,
    isExporting,
    showUpsellModal,
    requiredPlan,
    openUpsell,
    closeUpsell,
  };
};

import { useState } from 'react';
import toast from 'react-hot-toast';
import { nutritionistService, lgpdService } from '../services';
import { clearStoredTokens } from '@lib/api';
import { ROUTES } from '@routes/routes.config';
import type { UpdateNutritionistData } from '../services';

export const useProfile = (onSuccess?: () => void) => {
  const [isSaving, setIsSaving]       = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting]   = useState(false);

  const updateProfile = async (data: UpdateNutritionistData) => {
    setIsSaving(true);
    try {
      await nutritionistService.updateProfile(data);
      toast.success('Perfil atualizado com sucesso!');
      onSuccess?.();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : 'Erro ao salvar perfil'
      );
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  /** LGPD Art. 15 — portabilidade: baixa os dados do titular em JSON. */
  const exportMyData = async () => {
    setIsExporting(true);
    try {
      const data = await lgpdService.exportData();

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json',
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `nutriprogress-meus-dados-${
        new Date().toISOString().split('T')[0]
      }.json`;
      // Firefox exige o anchor no DOM para disparar o download.
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      // Revoga no próximo tick para não abortar o download em andamento.
      setTimeout(() => URL.revokeObjectURL(url), 0);

      toast.success('Dados exportados com sucesso!');
    } catch {
      toast.error('Erro ao exportar dados');
    } finally {
      setIsExporting(false);
    }
  };

  /** LGPD Art. 18, VI — eliminação: remove a conta e encerra a sessão. */
  const deleteAccount = async () => {
    setIsDeleting(true);
    try {
      await lgpdService.deleteAccount();
      toast.success('Conta excluída. Sentiremos sua falta!');
      clearStoredTokens();
      window.location.href = ROUTES.LOGIN;
    } catch {
      toast.error('Erro ao excluir conta');
      setIsDeleting(false);
    }
  };

  return {
    updateProfile,
    exportMyData,
    deleteAccount,
    isSaving,
    isExporting,
    isDeleting,
  };
};

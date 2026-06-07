import { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast';
import { billingService } from '../services';
import type { SubscriptionDTO, PlanName } from '../services';

interface UseBillingReturn {
  subscription:       SubscriptionDTO | null;
  isLoading:          boolean;
  isCheckingOut:      boolean;
  isCanceling:        boolean;
  error:              string | null;
  refetch:            () => Promise<void>;
  startCheckout:      (plan: PlanName) => Promise<void>;
  cancelSubscription: () => Promise<void>;
}

export const useBilling = (): UseBillingReturn => {
  const [subscription, setSubscription] = useState<SubscriptionDTO | null>(null);
  const [isLoading,     setIsLoading]     = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [isCanceling,   setIsCanceling]   = useState(false);
  const [error,         setError]         = useState<string | null>(null);

  const fetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await billingService.getSubscription();
      setSubscription(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar assinatura');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => { fetch(); }, [fetch]);

  const startCheckout = useCallback(async (plan: PlanName) => {
    setIsCheckingOut(true);
    try {
      const response = await billingService.createCheckout(plan);
      window.location.href = response.checkoutUrl;
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao iniciar checkout');
    } finally {
      setIsCheckingOut(false);
    }
  }, []);

  const cancelSubscription = useCallback(async () => {
    setIsCanceling(true);
    try {
      await billingService.cancelSubscription();
      toast.success('Assinatura cancelada. Acesso mantido até o fim do período.');
      await fetch();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Erro ao cancelar assinatura');
    } finally {
      setIsCanceling(false);
    }
  }, [fetch]);

  return {
    subscription,
    isLoading,
    isCheckingOut,
    isCanceling,
    error,
    refetch: fetch,
    startCheckout,
    cancelSubscription,
  };
};

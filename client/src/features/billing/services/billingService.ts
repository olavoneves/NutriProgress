import { api, API_ENDPOINTS } from '@lib/api';

export type PlanName = 'FREE' | 'STARTER' | 'PRO' | 'PREMIUM';
export type SubscriptionStatus =
  | 'ACTIVE' | 'CANCELED' | 'EXPIRED' | 'PENDING' | 'TRIAL';
export type PaymentStatus =
  | 'SUCCESS' | 'PENDING' | 'FAILED' | 'REFUNDED';

export interface PlanLimits {
  planName:           PlanName;
  maxPatients:        number;
  unlimitedPatients:  boolean;
  advancedCharts:     boolean;
  exportPdf:          boolean;
  customDashboard:    boolean;
  multiUser:          boolean;
  prioritySupport:    boolean;
  currentPatients:    number;
  remainingPatients:  number;
}

export interface SubscriptionDTO {
  id?:                  string;
  nutritionistId:       string;
  plan:                 PlanName;
  status:               SubscriptionStatus;
  amount?:              number;
  paymentMethod?:       string;
  currentPeriodStart?:  string;
  currentPeriodEnd?:    string;
  canceledAt?:          string;
  trialEndsAt?:         string;
  isActive:             boolean;
  limits:               PlanLimits;
}

export interface PaymentDTO {
  id:             string;
  amount:         number;
  status:         PaymentStatus;
  paymentMethod?: string;
  paidAt?:        string;
  createdAt:      string;
}

export interface CheckoutResponse {
  checkoutUrl: string;
  sessionId:   string;
}

const getSubscription = async (): Promise<SubscriptionDTO> => {
  const response = await api.get<{ data: SubscriptionDTO }>(
    API_ENDPOINTS.BILLING.SUBSCRIPTION
  );
  return response.data.data;
};

const createCheckout = async (
  plan: PlanName,
  successUrl?: string,
  cancelUrl?: string
): Promise<CheckoutResponse> => {
  const response = await api.post<{ data: CheckoutResponse }>(
    API_ENDPOINTS.BILLING.CHECKOUT,
    {
      plan,
      successUrl: successUrl ?? `${window.location.origin}/billing/success`,
      cancelUrl:  cancelUrl  ?? `${window.location.origin}/billing/cancel`,
    }
  );
  return response.data.data;
};

const cancelSubscription = async (): Promise<void> => {
  await api.post(API_ENDPOINTS.BILLING.CANCEL);
};

export const billingService = {
  getSubscription,
  createCheckout,
  cancelSubscription,
};

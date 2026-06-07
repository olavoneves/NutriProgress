import type { PlanName } from '../services';

export interface PlanConfig {
  name:        PlanName;
  label:       string;
  price:       number;
  priceLabel:  string;
  description: string;
  color:       string;
  highlight:   boolean;
  features:    Array<{ label: string; included: boolean }>;
  maxPatients: number | null;
  badge?:      string;
}

export const PLANS_CONFIG: PlanConfig[] = [
  {
    name:        'FREE',
    label:       'Gratuito',
    price:       0,
    priceLabel:  'Grátis',
    description: 'Para começar a usar o NutriProgress',
    color:       '#6b7280',
    highlight:   false,
    maxPatients: 5,
    features: [
      { label: 'Até 5 pacientes ativos',        included: true  },
      { label: 'Avaliações ilimitadas',          included: true  },
      { label: 'Gráficos básicos',               included: true  },
      { label: 'Exportar PDF',                   included: false },
      { label: 'Gráficos avançados',             included: false },
      { label: 'Dashboard personalizado',        included: false },
      { label: 'Multi-usuário',                  included: false },
      { label: 'Suporte prioritário',            included: false },
    ],
  },
  {
    name:        'STARTER',
    label:       'Starter',
    price:       29.90,
    priceLabel:  'R$ 29,90/mês',
    description: 'Para nutricionistas iniciantes',
    color:       '#3b82f6',
    highlight:   false,
    maxPatients: 20,
    features: [
      { label: 'Até 20 pacientes ativos',        included: true  },
      { label: 'Avaliações ilimitadas',          included: true  },
      { label: 'Gráficos básicos',               included: true  },
      { label: 'Exportar PDF',                   included: true  },
      { label: 'Gráficos avançados',             included: false },
      { label: 'Dashboard personalizado',        included: false },
      { label: 'Multi-usuário',                  included: false },
      { label: 'Suporte prioritário',            included: false },
    ],
  },
  {
    name:        'PRO',
    label:       'Pro',
    price:       49.90,
    priceLabel:  'R$ 49,90/mês',
    description: 'Para nutricionistas estabelecidos',
    color:       '#10b981',
    highlight:   true,
    maxPatients: 50,
    badge:       'Mais Popular',
    features: [
      { label: 'Até 50 pacientes ativos',        included: true  },
      { label: 'Avaliações ilimitadas',          included: true  },
      { label: 'Todos os gráficos',              included: true  },
      { label: 'Exportar PDF personalizado',     included: true  },
      { label: 'Gráficos avançados',             included: true  },
      { label: 'Dashboard personalizado',        included: true  },
      { label: 'Multi-usuário',                  included: false },
      { label: 'Suporte prioritário',            included: false },
    ],
  },
  {
    name:        'PREMIUM',
    label:       'Premium',
    price:       99.90,
    priceLabel:  'R$ 99,90/mês',
    description: 'Para clínicas e equipes',
    color:       '#8b5cf6',
    highlight:   false,
    maxPatients: null,
    features: [
      { label: 'Pacientes ilimitados',           included: true  },
      { label: 'Avaliações ilimitadas',          included: true  },
      { label: 'Todos os gráficos',              included: true  },
      { label: 'Exportar PDF personalizado',     included: true  },
      { label: 'Gráficos avançados',             included: true  },
      { label: 'Dashboard personalizado',        included: true  },
      { label: 'Multi-usuário',                  included: true  },
      { label: 'Suporte prioritário',            included: true  },
    ],
  },
];

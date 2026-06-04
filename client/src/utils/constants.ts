/**
 * Constantes globais da aplicação.
 */

export const APP_NAME = import.meta.env.VITE_APP_NAME || 'NutriProgress';
export const APP_VERSION = import.meta.env.VITE_APP_VERSION || '0.1.0';

/** Limites de paginação */
export const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;

/** Formatos de data */
export const DATE_FORMATS = {
    DISPLAY: 'dd/MM/yyyy',
    DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
    API: 'yyyy-MM-dd',
    ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

/** Gênero do paciente */
export const GENDER_LABELS: Record<'MALE' | 'FEMALE' | 'OTHER', string> = {
  MALE:   'Masculino',
  FEMALE: 'Feminino',
  OTHER:  'Outro',
};

/** Especialidades do nutricionista */
export const SPECIALTY_LABELS: Record<string, string> = {
  SPORTS_NUTRITION:   'Nutrição Esportiva',
  CLINICAL_NUTRITION: 'Nutrição Clínica',
  PEDIATRIC_NUTRITION:'Nutrição Pediátrica',
  ONCOLOGY_NUTRITION: 'Nutrição Oncológica',
  GERIATRIC_NUTRITION:'Nutrição Geriátrica',
  MATERNAL_NUTRITION: 'Nutrição Materno-Infantil',
  RENAL_NUTRITION:    'Nutrição Renal',
  GENERAL:            'Nutrição Geral',
};

/** Unidades de medida antropométricas */
export const UNITS = {
    WEIGHT: 'kg',
    HEIGHT: 'cm',
    CIRCUMFERENCE: 'cm',
    SKINFOLD: 'mm',
    PERCENTAGE: '%',
    BMI: 'kg/m²',
} as const;

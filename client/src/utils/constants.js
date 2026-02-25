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
};
/** Formatos de data */
export const DATE_FORMATS = {
    DISPLAY: 'dd/MM/yyyy',
    DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
    API: 'yyyy-MM-dd',
    ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
};
/** Unidades de medida antropométricas */
export const UNITS = {
    WEIGHT: 'kg',
    HEIGHT: 'cm',
    CIRCUMFERENCE: 'cm',
    SKINFOLD: 'mm',
    PERCENTAGE: '%',
    BMI: 'kg/m²',
};

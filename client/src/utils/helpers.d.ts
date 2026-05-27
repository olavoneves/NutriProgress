/**
 * Funções utilitárias genéricas.
 */
/**
 * Combina classes CSS condicionalmente (similar ao classnames/clsx).
 */
export declare function cn(...classes: (string | undefined | null | false)[]): string;
/**
 * Gera as iniciais do nome do usuário.
 * @example getInitials('João Silva') => 'JS'
 */
export declare function getInitials(name: string): string;
/**
 * Formata um número para exibição com casas decimais.
 */
export declare function formatNumber(value: number, decimals?: number): string;
/**
 * Formata peso em kg.
 */
export declare function formatWeight(kg: number): string;
/**
 * Formata altura em cm.
 */
export declare function formatHeight(cm: number): string;
/**
 * Calcula IMC (Índice de Massa Corporal).
 * @param weightKg - Peso em quilogramas
 * @param heightCm - Altura em centímetros
 * @returns IMC arredondado para 2 casas
 */
export declare function calculateBMI(weightKg: number, heightCm: number): number;
/**
 * Classifica o IMC segundo a OMS.
 */
export declare function classifyBMI(bmi: number): string;
/**
 * Trunca texto com reticências.
 */
export declare function truncate(text: string, maxLength: number): string;
/**
 * Capitaliza a primeira letra.
 */
export declare function capitalize(text: string): string;
/**
 * Delay / sleep.
 */
export declare function delay(ms: number): Promise<void>;
//# sourceMappingURL=helpers.d.ts.map
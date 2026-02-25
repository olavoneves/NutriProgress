/**
 * Funções utilitárias genéricas.
 */
/**
 * Combina classes CSS condicionalmente (similar ao classnames/clsx).
 */
export function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
/**
 * Gera as iniciais do nome do usuário.
 * @example getInitials('João Silva') => 'JS'
 */
export function getInitials(name) {
    return name
        .split(' ')
        .filter((part) => part.length > 0)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');
}
/**
 * Formata um número para exibição com casas decimais.
 */
export function formatNumber(value, decimals = 2) {
    return value.toFixed(decimals).replace('.', ',');
}
/**
 * Formata peso em kg.
 */
export function formatWeight(kg) {
    return `${formatNumber(kg, 1)} kg`;
}
/**
 * Formata altura em cm.
 */
export function formatHeight(cm) {
    return `${formatNumber(cm, 1)} cm`;
}
/**
 * Calcula IMC (Índice de Massa Corporal).
 * @param weightKg - Peso em quilogramas
 * @param heightCm - Altura em centímetros
 * @returns IMC arredondado para 2 casas
 */
export function calculateBMI(weightKg, heightCm) {
    const heightM = heightCm / 100;
    return Math.round((weightKg / (heightM * heightM)) * 100) / 100;
}
/**
 * Classifica o IMC segundo a OMS.
 */
export function classifyBMI(bmi) {
    if (bmi < 18.5)
        return 'Abaixo do peso';
    if (bmi < 25)
        return 'Peso normal';
    if (bmi < 30)
        return 'Sobrepeso';
    if (bmi < 35)
        return 'Obesidade Grau I';
    if (bmi < 40)
        return 'Obesidade Grau II';
    return 'Obesidade Grau III';
}
/**
 * Trunca texto com reticências.
 */
export function truncate(text, maxLength) {
    if (text.length <= maxLength)
        return text;
    return `${text.slice(0, maxLength)}...`;
}
/**
 * Capitaliza a primeira letra.
 */
export function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
/**
 * Delay / sleep.
 */
export function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

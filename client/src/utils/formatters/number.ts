export const formatWeight = (value: number | null | undefined): string => {
  if (value == null) return '—';
  return `${value.toFixed(1)} kg`;
};

export const formatHeight = (value: number | null | undefined): string => {
  if (value == null) return '—';
  return `${value.toFixed(1)} cm`;
};

export const formatPercentage = (value: number | null | undefined): string => {
  if (value == null) return '—';
  return `${value.toFixed(1)}%`;
};

export const formatBMI = (value: number | null | undefined): string => {
  if (value == null) return '—';
  return `${value.toFixed(2)} kg/m²`;
};

export const formatNumber = (
  value: number,
  decimals = 0
): string =>
  value.toLocaleString('pt-BR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

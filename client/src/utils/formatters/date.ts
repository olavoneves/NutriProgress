import { formatDistanceToNow, format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatRelative = (dateStr: string): string => {
  try {
    return formatDistanceToNow(parseISO(dateStr), {
      addSuffix: true,
      locale: ptBR,
    });
  } catch {
    return dateStr;
  }
};

export const formatDate = (dateStr: string, pattern = 'dd/MM/yyyy'): string => {
  try {
    return format(parseISO(dateStr), pattern, { locale: ptBR });
  } catch {
    return dateStr;
  }
};

export const formatDateDisplay = (dateStr: string): string =>
  formatDate(dateStr, 'dd/MM/yyyy HH:mm');

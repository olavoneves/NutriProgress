import { api, API_ENDPOINTS } from '@lib/api';

/**
 * Converte o nome do paciente em um slug seguro para nome de arquivo.
 * O `normalize('NFD')` separa a letra base do acento; o filtro seguinte
 * descarta tudo fora do ASCII imprimivel, que sao justamente os acentos.
 */
const slugify = (value: string): string =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[^\x20-\x7E]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/**
 * Baixa o PDF de evolucao do paciente.
 * A API retorna um blob binario — por isso `responseType: 'blob'`.
 * Erros vem como blob JSON e sao normalizados pelo interceptor.
 */
const downloadPatientReport = async (
  patientId: string,
  patientName: string
): Promise<void> => {
  const response = await api.get<Blob>(
    API_ENDPOINTS.PATIENTS.REPORT_PDF(patientId),
    { responseType: 'blob' }
  );

  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url  = URL.createObjectURL(blob);

  const slug = slugify(patientName) || 'paciente';
  const date = new Date().toISOString().split('T')[0];

  const link = document.createElement('a');
  link.href = url;
  link.download = `evolucao-${slug}-${date}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const reportService = { downloadPatientReport };

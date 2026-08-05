import { api, API_ENDPOINTS } from '@lib/api';

/** Espelha `DataExportDTO` do backend (`GET /lgpd/export`). */
export interface DataExport {
  nutritionistId:   string;
  exportedAt:       string;
  personalData:     Record<string, unknown>;
  professionalData: Record<string, unknown>;
  subscriptions:    Array<Record<string, unknown>>;
  payments:         Array<Record<string, unknown>>;
  aggregatedStats:  Record<string, unknown>;
}

const exportData = async (): Promise<DataExport> => {
  const response = await api.get<{ data: DataExport }>(
    API_ENDPOINTS.LGPD.EXPORT
  );
  return response.data.data;
};

const deleteAccount = async (): Promise<void> => {
  await api.delete(API_ENDPOINTS.LGPD.ACCOUNT);
};

export const lgpdService = { exportData, deleteAccount };

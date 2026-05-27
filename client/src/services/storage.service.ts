import type { StorageKey } from '@/@types';

/**
 * Serviço centralizado de acesso ao localStorage.
 * Todas as leituras/escritas no storage passam por aqui.
 */
export const StorageService = {
    get<T = unknown>(key: StorageKey): T | null {
        try {
            const value = localStorage.getItem(key);
            return value ? (JSON.parse(value) as T) : null;
        } catch (error) {
            console.error(`[StorageService] Erro ao ler '${key}':`, error);
            return null;
        }
    },

    set<T = unknown>(key: StorageKey, value: T): void {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`[StorageService] Erro ao salvar '${key}':`, error);
        }
    },

    remove(key: StorageKey): void {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error(`[StorageService] Erro ao remover '${key}':`, error);
        }
    },

    clear(): void {
        try {
            localStorage.clear();
        } catch (error) {
            console.error('[StorageService] Erro ao limpar storage:', error);
        }
    },
};

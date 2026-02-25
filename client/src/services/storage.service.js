/**
 * Serviço centralizado de acesso ao localStorage.
 * Todas as leituras/escritas no storage passam por aqui.
 */
export const StorageService = {
    get(key) {
        try {
            const value = localStorage.getItem(key);
            return value ? JSON.parse(value) : null;
        }
        catch (error) {
            console.error(`[StorageService] Erro ao ler '${key}':`, error);
            return null;
        }
    },
    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch (error) {
            console.error(`[StorageService] Erro ao salvar '${key}':`, error);
        }
    },
    remove(key) {
        try {
            localStorage.removeItem(key);
        }
        catch (error) {
            console.error(`[StorageService] Erro ao remover '${key}':`, error);
        }
    },
    clear() {
        try {
            localStorage.clear();
        }
        catch (error) {
            console.error('[StorageService] Erro ao limpar storage:', error);
        }
    },
};

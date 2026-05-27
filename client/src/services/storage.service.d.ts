import type { StorageKey } from '@/@types';
/**
 * Serviço centralizado de acesso ao localStorage.
 * Todas as leituras/escritas no storage passam por aqui.
 */
export declare const StorageService: {
    get<T = unknown>(key: StorageKey): T | null;
    set<T = unknown>(key: StorageKey, value: T): void;
    remove(key: StorageKey): void;
    clear(): void;
};
//# sourceMappingURL=storage.service.d.ts.map
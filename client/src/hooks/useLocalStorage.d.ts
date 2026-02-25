/**
 * Hook para persistir estado no localStorage.
 * Sync automático entre get/set e localStorage.
 *
 * @param key - Chave do localStorage
 * @param initialValue - Valor inicial caso não exista no storage
 */
export declare function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void, () => void];
//# sourceMappingURL=useLocalStorage.d.ts.map
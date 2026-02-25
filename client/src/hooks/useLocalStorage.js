import { useState, useCallback } from 'react';
/**
 * Hook para persistir estado no localStorage.
 * Sync automático entre get/set e localStorage.
 *
 * @param key - Chave do localStorage
 * @param initialValue - Valor inicial caso não exista no storage
 */
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }
        catch (error) {
            console.error(`[useLocalStorage] Erro ao ler '${key}':`, error);
            return initialValue;
        }
    });
    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        catch (error) {
            console.error(`[useLocalStorage] Erro ao salvar '${key}':`, error);
        }
    }, [key, storedValue]);
    const removeValue = useCallback(() => {
        try {
            localStorage.removeItem(key);
            setStoredValue(initialValue);
        }
        catch (error) {
            console.error(`[useLocalStorage] Erro ao remover '${key}':`, error);
        }
    }, [key, initialValue]);
    return [storedValue, setValue, removeValue];
}

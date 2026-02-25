import { useState, useEffect } from 'react';
/**
 * Hook de debounce que atrasa a atualização de um valor
 * até que o usuário pare de digitá-lo.
 *
 * @param value - Valor a ser debounced
 * @param delay - Tempo de atraso em ms (default: 300)
 * @returns Valor debounced
 */
export function useDebounce(value, delay = 300) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);
    return debouncedValue;
}

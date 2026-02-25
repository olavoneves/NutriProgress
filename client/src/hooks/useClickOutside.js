import { useEffect, useRef } from 'react';
/**
 * Hook que detecta cliques fora de um elemento referenciado.
 * Útil para fechar dropdowns, modais, menus, etc.
 *
 * @param callback - Função chamada quando o clique acontece fora do elemento
 * @param enabled - Se o listener deve estar ativo (default: true)
 * @returns ref - Ref para anexar ao elemento a ser monitorado
 */
export function useClickOutside(callback, enabled = true) {
    const ref = useRef(null);
    useEffect(() => {
        if (!enabled)
            return;
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                callback();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [callback, enabled]);
    return ref;
}

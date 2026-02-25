import type { RefObject } from 'react';
/**
 * Hook que detecta cliques fora de um elemento referenciado.
 * Útil para fechar dropdowns, modais, menus, etc.
 *
 * @param callback - Função chamada quando o clique acontece fora do elemento
 * @param enabled - Se o listener deve estar ativo (default: true)
 * @returns ref - Ref para anexar ao elemento a ser monitorado
 */
export declare function useClickOutside<T extends HTMLElement = HTMLElement>(callback: () => void, enabled?: boolean): RefObject<T | null>;
//# sourceMappingURL=useClickOutside.d.ts.map
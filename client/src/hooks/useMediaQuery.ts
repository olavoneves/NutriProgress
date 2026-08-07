import { useCallback, useSyncExternalStore } from 'react';

/**
 * Assina uma media query via `useSyncExternalStore` — o valor inicial vem
 * direto do snapshot, sem `setState` dentro de efeito.
 */
export function useMediaQuery(query: string): boolean {
    const subscribe = useCallback(
        (onStoreChange: () => void) => {
            const mediaQuery = window.matchMedia(query);
            mediaQuery.addEventListener('change', onStoreChange);
            return () => {
                mediaQuery.removeEventListener('change', onStoreChange);
            };
        },
        [query],
    );

    const getSnapshot = useCallback(
        () => window.matchMedia(query).matches,
        [query],
    );

    // No SSR não há `window`; assume-se que a query não casa.
    const getServerSnapshot = useCallback(() => false, []);

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

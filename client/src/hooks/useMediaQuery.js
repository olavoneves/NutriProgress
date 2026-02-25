import { useState, useEffect } from 'react';
/**
 * Hook que monitora uma media query CSS e retorna se ela está ativa.
 * Útil para adaptar comportamentos com base no tamanho da tela.
 *
 * @param query - Media query CSS (ex: '(max-width: 768px)')
 * @returns boolean - Se a media query está ativa
 */
export function useMediaQuery(query) {
    const [matches, setMatches] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia(query).matches;
        }
        return false;
    });
    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        const handleChange = (event) => {
            setMatches(event.matches);
        };
        // Set initial value
        setMatches(mediaQuery.matches);
        // Listen for changes
        mediaQuery.addEventListener('change', handleChange);
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, [query]);
    return matches;
}

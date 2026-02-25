import { useEffect, useRef } from 'react';
import type { RefObject } from 'react';

export function useClickOutside<T extends HTMLElement = HTMLElement>(
    callback: () => void,
    enabled: boolean = true,
): RefObject<T | null> {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        if (!enabled) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
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

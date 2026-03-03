import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop — Nielsen's Heuristic #1: Visibility of System Status
 * Resets scroll position on every route change so users always start
 * at the top of a new page (matches mental model from physical browsing).
 */
export default function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
    }, [pathname]);
    return null;
}

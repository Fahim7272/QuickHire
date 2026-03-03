/**
 * Lightweight auth helper — stores admin session in localStorage.
 * No real backend required; purely client-side for the assessment.
 */

const KEY = 'qh_admin_session';

export function loginAsAdmin() {
    localStorage.setItem(KEY, JSON.stringify({ role: 'admin', at: Date.now() }));
    window.dispatchEvent(new Event('qh-auth-change'));
}

export function logout() {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event('qh-auth-change'));
}

export function isAdminLoggedIn() {
    try {
        const s = localStorage.getItem(KEY);
        return s ? JSON.parse(s).role === 'admin' : false;
    } catch { return false; }
}

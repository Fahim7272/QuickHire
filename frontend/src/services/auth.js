const ADMIN_KEY = 'qh_admin_session';
const USER_KEY = 'qh_user_session';

// ── Admin ─────────────────────────────────────────────────────────────────────
export function loginAsAdmin() {
    localStorage.setItem(ADMIN_KEY, JSON.stringify({ role: 'admin', at: Date.now() }));
    window.dispatchEvent(new Event('qh-auth-change'));
}

// ── User — now stores token + full user object from API ───────────────────────
export function loginAsUser(token, user) {
    localStorage.setItem(USER_KEY, JSON.stringify({ token, ...user, at: Date.now() }));
    window.dispatchEvent(new Event('qh-auth-change'));
}

export function updateUserSession(user) {
    try {
        const existing = JSON.parse(localStorage.getItem(USER_KEY) || '{}');
        localStorage.setItem(USER_KEY, JSON.stringify({ ...existing, ...user }));
        window.dispatchEvent(new Event('qh-auth-change'));
    } catch { }
}

// ── Logout ────────────────────────────────────────────────────────────────────
export function logout() {
    localStorage.removeItem(ADMIN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event('qh-auth-change'));
}

// ── Selectors ─────────────────────────────────────────────────────────────────
export function isAdminLoggedIn() {
    try {
        const s = localStorage.getItem(ADMIN_KEY);
        return s ? JSON.parse(s).role === 'admin' : false;
    } catch { return false; }
}

export function isUserLoggedIn() {
    try {
        const s = localStorage.getItem(USER_KEY);
        return !!s && !!JSON.parse(s).token;
    } catch { return false; }
}

export function getUser() {
    try {
        const s = localStorage.getItem(USER_KEY);
        return s ? JSON.parse(s) : null;
    } catch { return null; }
}

export function getToken() {
    try {
        const s = localStorage.getItem(USER_KEY);
        return s ? JSON.parse(s).token : null;
    } catch { return null; }
}

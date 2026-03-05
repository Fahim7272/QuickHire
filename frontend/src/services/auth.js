const ADMIN_KEY = 'qh_admin_session';
const USER_KEY = 'qh_user_session';

export function loginAsAdmin() {
    localStorage.setItem(ADMIN_KEY, JSON.stringify({ role: 'admin', at: Date.now() }));
    window.dispatchEvent(new Event('qh-auth-change'));
}

export function loginAsUser(name, email) {
    localStorage.setItem(USER_KEY, JSON.stringify({ name, email, at: Date.now() }));
    window.dispatchEvent(new Event('qh-auth-change'));
}

export function logout() {
    localStorage.removeItem(ADMIN_KEY);
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event('qh-auth-change'));
}

export function isAdminLoggedIn() {
    try {
        const s = localStorage.getItem(ADMIN_KEY);
        return s ? JSON.parse(s).role === 'admin' : false;
    } catch { return false; }
}

export function isUserLoggedIn() {
    try {
        const s = localStorage.getItem(USER_KEY);
        return !!s && !!JSON.parse(s).email;
    } catch { return false; }
}

export function getUser() {
    try {
        const s = localStorage.getItem(USER_KEY);
        return s ? JSON.parse(s) : null;
    } catch { return null; }
}

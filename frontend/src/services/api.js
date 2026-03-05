import axios from 'axios';

const API_BASE = '/api';

// ── Auth header helper ───────────────────────────────────────────────────────
function authHeader() {
    try {
        const session = JSON.parse(localStorage.getItem('qh_user_session') || '{}');
        if (session.token) return { Authorization: `Bearer ${session.token}` };
    } catch { }
    return {};
}

// ── Jobs ─────────────────────────────────────────────────────────────────────
export const getJobs = (params = {}) => axios.get(`${API_BASE}/jobs`, { params });
export const getJob = (id) => axios.get(`${API_BASE}/jobs/${id}`);
export const createJob = (data) => axios.post(`${API_BASE}/jobs`, data);
export const deleteJob = (id) => axios.delete(`${API_BASE}/jobs/${id}`);

// ── Applications ─────────────────────────────────────────────────────────────
export const submitApplication = (data) => axios.post(`${API_BASE}/applications`, data);

// ── Auth ─────────────────────────────────────────────────────────────────────
export const registerUser = (data) =>
    axios.post(`${API_BASE}/register`, data);

export const loginUser = (email, password) =>
    axios.post(`${API_BASE}/login`, { email, password });

export const logoutUser = () =>
    axios.post(`${API_BASE}/logout`, {}, { headers: authHeader() });

// ── User profile ─────────────────────────────────────────────────────────────
export const getMe = () =>
    axios.get(`${API_BASE}/me`, { headers: authHeader() });

export const updateMe = (data) =>
    axios.put(`${API_BASE}/me`, data, { headers: authHeader() });

export const uploadProfilePhoto = (file) => {
    const form = new FormData();
    form.append('photo', file);
    return axios.post(`${API_BASE}/me/photo`, form, {
        headers: { ...authHeader(), 'Content-Type': 'multipart/form-data' },
    });
};

export const getMyApplications = () =>
    axios.get(`${API_BASE}/me/applications`, { headers: authHeader() });

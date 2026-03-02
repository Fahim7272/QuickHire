import axios from 'axios';

const API_BASE = '/api';

// Jobs
export const getJobs = (params = {}) => axios.get(`${API_BASE}/jobs`, { params });
export const getJob = (id) => axios.get(`${API_BASE}/jobs/${id}`);
export const createJob = (data) => axios.post(`${API_BASE}/jobs`, data);
export const deleteJob = (id) => axios.delete(`${API_BASE}/jobs/${id}`);

// Applications
export const submitApplication = (data) => axios.post(`${API_BASE}/applications`, data);

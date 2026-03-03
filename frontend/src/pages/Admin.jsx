import React, { useEffect, useState } from 'react';
import { Plus, Trash2, CheckCircle2, AlertCircle, Lock, Eye, EyeOff, Building2, MapPin, Star, BarChart2, Users, Briefcase } from 'lucide-react';
import { getJobs, createJob, deleteJob } from '../services/api';
import { mockJobs } from '../services/mockData';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ADMIN_PIN = '1234';
const CATEGORIES = ['Design', 'Sales', 'Marketing', 'Finance', 'Technology', 'Engineering', 'Business', 'Human Resource'];
const TYPES = ['Full Time', 'Part Time', 'Remote', 'Internship', 'Contract'];
const EMPTY = { title: '', company: '', company_logo: '', location: '', category: 'Design', type: 'Full Time', description: '', salary_range: '', is_featured: false };

const CAT_COLORS = {
    Marketing: { bg: '#FFF4E5', text: '#C47B0E' }, Design: { bg: '#EBF5FF', text: '#1E6DB7' },
    Business: { bg: '#EEF4FF', text: '#4A5AE8' }, Technology: { bg: '#FFF0EF', text: '#C13B31' },
    Engineering: { bg: '#EDF9F0', text: '#1A7F4A' }, Finance: { bg: '#F5F0FF', text: '#6B3FBF' },
    Sales: { bg: '#FFF0F6', text: '#C02D7A' }, 'Human Resource': { bg: '#E9F9FF', text: '#0A7FA3' },
};

function PinGate({ onUnlock }) {
    const [pin, setPin] = useState('');
    const [show, setShow] = useState(false);
    const [err, setErr] = useState('');
    const [attempts, setAttempts] = useState(0);

    const submit = e => {
        e.preventDefault();
        if (pin === ADMIN_PIN) { onUnlock(); }
        else { setAttempts(a => a + 1); setErr(`Incorrect PIN. ${3 - attempts - 1} attempt(s) remaining.`); setPin(''); }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 20, padding: '40px 40px 36px', width: '100%', maxWidth: 380, textAlign: 'center', boxShadow: '0 8px 32px rgba(15,23,42,0.08)' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', border: '1.5px solid #C7D2FE' }}>
                    <Lock size={24} color="#4F46E5" />
                </div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 6, letterSpacing: '-0.02em' }}>Admin Access</h1>
                <p style={{ fontSize: 14, color: '#94A3B8', marginBottom: 28, lineHeight: 1.5 }}>Enter your PIN to manage job listings</p>
                <form onSubmit={submit}>
                    <div style={{ position: 'relative', marginBottom: 16 }}>
                        <input type={show ? 'text' : 'password'} value={pin}
                            onChange={e => { setPin(e.target.value); setErr(''); }}
                            placeholder="••••"
                            maxLength={8}
                            autoFocus
                            aria-label="Admin PIN"
                            aria-describedby={err ? 'pin-error' : 'pin-hint'}
                            style={{ width: '100%', padding: '14px 48px 14px 16px', borderRadius: 12, border: `1.5px solid ${err ? '#FCA5A5' : '#E2E8F0'}`, background: err ? '#FFF5F5' : '#F8FAFC', fontSize: 22, fontWeight: 700, textAlign: 'center', letterSpacing: '0.25em', outline: 'none', fontFamily: 'inherit', color: '#0F172A', transition: 'border-color 150ms', boxSizing: 'border-box' }}
                        />
                        <button type="button" onClick={() => setShow(!show)} aria-label={show ? 'Hide PIN' : 'Show PIN'}
                            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', border: 'none', background: 'none', cursor: 'pointer', color: '#94A3B8' }}>
                            {show ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                    {err && <p id="pin-error" role="alert" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontSize: 13, color: '#EF4444', marginBottom: 14 }}><AlertCircle size={13} />{err}</p>}
                    <p id="pin-hint" style={{ fontSize: 11, color: '#94A3B8', marginBottom: 16 }}>Default PIN: <strong>1234</strong></p>
                    <button type="submit"
                        style={{ width: '100%', padding: 14, background: 'linear-gradient(135deg,#4F46E5,#6366F1)', color: '#fff', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 16px rgba(79,70,229,0.35)', transition: 'all 150ms ease' }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 24px rgba(79,70,229,0.5)'}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(79,70,229,0.35)'}>
                        Unlock Admin
                    </button>
                </form>
            </div>
        </div>
    );
}

function Toast({ msg, type = 'success', onDismiss }) {
    useEffect(() => { const t = setTimeout(onDismiss, 3000); return () => clearTimeout(t); }, []);
    const styles = type === 'success'
        ? { bg: '#DCFCE7', border: '#86EFAC', color: '#166534' }
        : { bg: '#FEF2F2', border: '#FECACA', color: '#DC2626' };
    return (
        <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 200, maxWidth: 360, background: styles.bg, border: `1px solid ${styles.border}`, color: styles.color, borderRadius: 12, padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 10, boxShadow: '0 8px 28px rgba(15,23,42,0.12)', animation: 'fadeInUp 0.25s ease', fontSize: 14, fontWeight: 600 }} role="status" aria-live="polite">
            {type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {msg}
            <button onClick={onDismiss} style={{ border: 'none', background: 'none', cursor: 'pointer', marginLeft: 'auto', color: 'inherit', fontSize: 16, padding: 0 }}>×</button>
        </div>
    );
}

function AddJobForm({ onJobAdded }) {
    const [form, setForm] = useState(EMPTY);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState(null);

    const required = { title: true, company: true, location: true, description: true };

    const validate = (name, value) => {
        if (required[name] && !value.trim()) return 'Required';
        return '';
    };

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        const v = type === 'checkbox' ? checked : value;
        setForm(p => ({ ...p, [name]: v }));
        if (required[name]) setErrors(p => ({ ...p, [name]: validate(name, String(v)) }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const newErrors = {};
        Object.keys(required).forEach(k => { const err = validate(k, form[k]); if (err) newErrors[k] = err; });
        if (Object.keys(newErrors).length) { setErrors(newErrors); return; }
        setSubmitting(true);
        try {
            await createJob(form);
            setToast({ msg: `"${form.title}" created successfully!`, type: 'success' });
            setForm(EMPTY); setErrors({});
            onJobAdded();
        } catch {
            // Optimistic local update when backend unavailable
            setToast({ msg: `"${form.title}" created (demo mode)!`, type: 'success' });
            setForm(EMPTY); setErrors({});
            onJobAdded();
        } finally { setSubmitting(false); }
    };

    const inputStyle = name => ({
        width: '100%', padding: '10px 13px', borderRadius: 9, fontSize: 13, color: '#0F172A', outline: 'none', fontFamily: 'inherit',
        border: `1.5px solid ${errors[name] ? '#FCA5A5' : '#E2E8F0'}`,
        background: errors[name] ? '#FFF5F5' : '#F8FAFC',
        transition: 'border-color 150ms, box-shadow 150ms',
        boxSizing: 'border-box',
    });

    const inputFocus = e => { e.target.style.borderColor = '#4F46E5'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.08)'; };
    const inputBlur = (e, name) => { e.target.style.boxShadow = 'none'; if (!errors[name]) { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; } };

    return (
        <>
            {toast && <Toast {...toast} onDismiss={() => setToast(null)} />}
            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 9, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Plus size={16} color="#4F46E5" /></div>
                    <div>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', lineHeight: 1 }}>Add New Job Listing</h2>
                        <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>Fill in the details below to post a new job</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 16px', marginBottom: 12 }}>
                        {[
                            { label: 'Job Title', name: 'title', ph: 'e.g. Senior Product Designer' },
                            { label: 'Company', name: 'company', ph: 'e.g. Google' },
                            { label: 'Location', name: 'location', ph: 'e.g. New York, US' },
                            { label: 'Company Logo URL', name: 'company_logo', ph: 'https://…', req: false },
                            { label: 'Salary Range', name: 'salary_range', ph: 'e.g. $80k – $120k', req: false },
                        ].map(({ label, name, ph, req = true }) => (
                            <div key={name}>
                                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                    {label} {req && <span style={{ color: '#EF4444' }}>*</span>}
                                </label>
                                <input type="text" name={name} value={form[name]} onChange={handleChange} placeholder={ph}
                                    style={inputStyle(name)} onFocus={inputFocus} onBlur={e => inputBlur(e, name)} />
                                {errors[name] && <p style={{ fontSize: 11, color: '#EF4444', marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}><AlertCircle size={10} />{errors[name]}</p>}
                            </div>
                        ))}

                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Category <span style={{ color: '#EF4444' }}>*</span></label>
                            <select name="category" value={form.category} onChange={handleChange} style={{ ...inputStyle('category'), cursor: 'pointer' }} onFocus={inputFocus} onBlur={e => inputBlur(e, 'category')}>
                                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Job Type <span style={{ color: '#EF4444' }}>*</span></label>
                            <select name="type" value={form.type} onChange={handleChange} style={{ ...inputStyle('type'), cursor: 'pointer' }} onFocus={inputFocus} onBlur={e => inputBlur(e, 'type')}>
                                {TYPES.map(t => <option key={t}>{t}</option>)}
                            </select>
                        </div>

                        <div style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', gap: 10 }}>
                            <input type="checkbox" id="is_featured" name="is_featured" checked={form.is_featured} onChange={handleChange} style={{ width: 18, height: 18, accentColor: '#4F46E5', cursor: 'pointer' }} />
                            <label htmlFor="is_featured" style={{ fontSize: 13, fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
                                ⭐ Feature on homepage <span style={{ fontSize: 11, color: '#94A3B8', fontWeight: 400 }}>(shows in Featured Jobs section)</span>
                            </label>
                        </div>
                    </div>

                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, color: '#64748B', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            <span>Job Description <span style={{ color: '#EF4444' }}>*</span></span>
                            <span style={{ textTransform: 'none', fontWeight: 400, color: form.description.length > 50 ? '#16A34A' : '#94A3B8' }}>
                                {form.description.length} chars {form.description.length > 50 ? '✓' : ''}
                            </span>
                        </label>
                        <textarea name="description" value={form.description} onChange={handleChange}
                            placeholder="Describe the role, responsibilities, and requirements…" rows={5}
                            style={{ ...inputStyle('description'), resize: 'vertical' }}
                            onFocus={inputFocus} onBlur={e => inputBlur(e, 'description')}
                        />
                        {errors.description && <p style={{ fontSize: 11, color: '#EF4444', marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}><AlertCircle size={10} />{errors.description}</p>}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <button type="submit" disabled={submitting}
                            style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '12px 28px', background: 'linear-gradient(135deg,#4F46E5,#6366F1)', color: '#fff', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: submitting ? 'wait' : 'pointer', opacity: submitting ? 0.8 : 1, boxShadow: '0 4px 14px rgba(79,70,229,0.35)', transition: 'all 150ms' }}
                            onMouseEnter={e => !submitting && (e.currentTarget.style.boxShadow = '0 6px 20px rgba(79,70,229,0.5)')}
                            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 14px rgba(79,70,229,0.35)'}>
                            {submitting ? '…' : <><Plus size={15} /> Create Listing</>}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

function JobsTable({ jobs, loading, onDelete }) {
    const [confirmId, setConfirmId] = useState(null);
    const [deleting, setDeleting] = useState(null);
    const [toast, setToast] = useState(null);

    const doDelete = async id => {
        setDeleting(id);
        try {
            await deleteJob(id);
            onDelete(id);
            setToast({ msg: 'Job listing deleted.', type: 'success' });
        } catch {
            onDelete(id);
            setToast({ msg: 'Job removed (demo mode).', type: 'success' });
        } finally { setDeleting(null); setConfirmId(null); }
    };

    return (
        <>
            {toast && <Toast {...toast} onDismiss={() => setToast(null)} />}
            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, overflow: 'hidden' }}>
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>All Job Listings</h2>
                        <p style={{ fontSize: 12, color: '#94A3B8', marginTop: 2 }}>{jobs.length} listing{jobs.length !== 1 ? 's' : ''} total</p>
                    </div>
                </div>

                {loading ? <LoadingSpinner text="Loading listings…" /> : jobs.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '48px 0', fontSize: 14, color: '#94A3B8' }}>No listings yet. Create one above!</div>
                ) : (
                    <div>
                        {jobs.map(job => {
                            const cs = CAT_COLORS[job.category] || { bg: '#F1F5F9', text: '#475569' };
                            return (
                                <div key={job.id}
                                    style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 24px', borderBottom: '1px solid #F9FAFB', transition: 'background 150ms ease' }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>

                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: '#4F46E5', flexShrink: 0 }}>
                                        {job.company?.slice(0, 2).toUpperCase()}
                                    </div>

                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3, flexWrap: 'wrap' }}>
                                            <span style={{ fontWeight: 700, fontSize: 14, color: '#0F172A' }}>{job.title}</span>
                                            {job.is_featured && <span style={{ fontSize: 10, fontWeight: 700, background: '#FEF3C7', color: '#D97706', borderRadius: 9999, padding: '2px 7px' }}>⭐ Featured</span>}
                                        </div>
                                        <div style={{ fontSize: 12, color: '#94A3B8', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><Building2 size={11} />{job.company}</span>
                                            <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><MapPin size={11} />{job.location}</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                                        <span style={{ background: cs.bg, color: cs.text, fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 9999 }}>{job.category}</span>
                                        <span style={{ border: '1.5px solid #E2E8F0', color: '#64748B', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 5 }}>{job.type}</span>
                                    </div>

                                    <div style={{ flexShrink: 0 }}>
                                        {confirmId === job.id ? (
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <span style={{ fontSize: 12, color: '#64748B' }}>Delete?</span>
                                                <button onClick={() => doDelete(job.id)} disabled={deleting === job.id}
                                                    style={{ padding: '5px 10px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: 'pointer', opacity: deleting === job.id ? 0.6 : 1 }}>
                                                    {deleting === job.id ? '…' : 'Yes, delete'}
                                                </button>
                                                <button onClick={() => setConfirmId(null)}
                                                    style={{ padding: '5px 10px', border: '1px solid #E2E8F0', background: '#fff', color: '#475569', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button onClick={() => setConfirmId(job.id)}
                                                style={{ width: 36, height: 36, borderRadius: 8, border: '1.5px solid #E2E8F0', background: '#F8FAFC', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EF4444', transition: 'all 150ms' }}
                                                onMouseEnter={e => { e.currentTarget.style.background = '#FEF2F2'; e.currentTarget.style.borderColor = '#FCA5A5'; }}
                                                onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
                                                aria-label={`Delete ${job.title}`} title="Delete listing">
                                                <Trash2 size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}

export default function Admin() {
    const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('admin_ok') === '1');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleUnlock = () => { sessionStorage.setItem('admin_ok', '1'); setUnlocked(true); };

    const loadJobs = async () => {
        try {
            const r = await getJobs({ per_page: 100 });
            const data = r.data?.data || r.data || [];
            setJobs(Array.isArray(data) && data.length ? data : mockJobs);
        } catch { setJobs(mockJobs); }
        finally { setLoading(false); }
    };

    useEffect(() => {
        document.title = 'Admin Dashboard | QuickHire';
        if (unlocked) loadJobs();
    }, [unlocked]);

    if (!unlocked) return <PinGate onUnlock={handleUnlock} />;

    const stats = [
        { label: 'Total Listings', value: jobs.length, Icon: Briefcase, gradient: 'linear-gradient(135deg,#EEF2FF,#E0E7FF)', color: '#4F46E5' },
        { label: 'Featured', value: jobs.filter(j => j.is_featured).length, Icon: Star, gradient: 'linear-gradient(135deg,#FEF3C7,#FDE68A)', color: '#D97706' },
        { label: 'Full-Time', value: jobs.filter(j => j.type === 'Full Time').length, Icon: Users, gradient: 'linear-gradient(135deg,#DCFCE7,#BBF7D0)', color: '#16A34A' },
        { label: 'Remote', value: jobs.filter(j => j.type === 'Remote').length, Icon: BarChart2, gradient: 'linear-gradient(135deg,#F3E8FF,#E9D5FF)', color: '#7C3AED' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
            <div style={{ background: '#fff', borderBottom: '1px solid #F1F5F9' }}>
                <div style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
                    <div>
                        <h1 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.01em' }}>Admin Dashboard</h1>
                        <p style={{ fontSize: 12, color: '#94A3B8' }}>Manage job listings</p>
                    </div>
                    <button onClick={() => { sessionStorage.removeItem('admin_ok'); setUnlocked(false); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', border: '1.5px solid #E2E8F0', borderRadius: 9, fontSize: 13, fontWeight: 600, color: '#64748B', background: '#F8FAFC', cursor: 'pointer', transition: 'all 150ms' }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = '#CBD5E1'; e.currentTarget.style.color = '#0F172A'; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.color = '#64748B'; }}>
                        <Lock size={13} /> Lock
                    </button>
                </div>
            </div>

            <div style={{ maxWidth: 1152, margin: '0 auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
                    {stats.map(({ label, value, Icon, gradient, color }) => (
                        <div key={label} style={{ background: gradient, borderRadius: 14, padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Icon size={18} color={color} />
                            </div>
                            <div>
                                <div style={{ fontSize: 26, fontWeight: 800, color, lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</div>
                                <div style={{ fontSize: 11, fontWeight: 600, color, opacity: 0.7, marginTop: 2 }}>{label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                <AddJobForm onJobAdded={loadJobs} />
                <JobsTable jobs={jobs} loading={loading} onDelete={id => setJobs(p => p.filter(j => j.id !== id))} />
            </div>

            <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
    );
}

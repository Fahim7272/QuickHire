import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    MapPin, Building2, Clock, DollarSign, Send,
    CheckCircle2, AlertCircle, Bookmark, BookmarkCheck, Share2,
    Users, Briefcase, ChevronRight
} from 'lucide-react';
import { getJob, getJobs, submitApplication } from '../services/api';
import { mockJobs, COMPANY_LOGO_MAP } from '../services/mockData';
import { getUser } from '../services/auth';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const CATEGORY_COLORS = {
    Marketing: { bg: '#FFF4E5', text: '#C47B0E' }, Design: { bg: '#EBF5FF', text: '#1E6DB7' },
    Business: { bg: '#EEF4FF', text: '#4A5AE8' }, Technology: { bg: '#FFF0EF', text: '#C13B31' },
    Engineering: { bg: '#EDF9F0', text: '#1A7F4A' }, Finance: { bg: '#F5F0FF', text: '#6B3FBF' },
    Sales: { bg: '#FFF0F6', text: '#C02D7A' }, 'Human Resource': { bg: '#E9F9FF', text: '#0A7FA3' },
};

function Field({ label, name, type = 'text', placeholder, value, onChange, error, required, hint }) {
    const [touched, setTouched] = useState(false);
    const showErr = touched && error;
    const baseStyle = {
        width: '100%', padding: '11px 14px', borderRadius: 10, fontSize: 14,
        fontFamily: 'inherit', outline: 'none',
        border: `1.5px solid ${showErr ? '#FCA5A5' : '#E2E8F0'}`,
        background: showErr ? '#FFF5F5' : '#F8FAFC',
        color: '#0F172A', lineHeight: 1.6, transition: 'border-color 150ms, box-shadow 150ms',
        boxSizing: 'border-box',
    };
    const onFocus = e => { e.target.style.borderColor = '#4F46E5'; e.target.style.background = '#fff'; e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)'; };
    const onBlurStyle = e => { setTouched(true); e.target.style.boxShadow = 'none'; if (!showErr) { e.target.style.borderColor = '#E2E8F0'; e.target.style.background = '#F8FAFC'; } };

    return (
        <div>
            <label htmlFor={name} style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#475569', marginBottom: 6 }}>
                {label} {required && <span style={{ color: '#EF4444' }}>*</span>}
            </label>
            {type === 'textarea' ? (
                <textarea id={name} name={name} rows={4} value={value} onChange={onChange}
                    placeholder={placeholder} onFocus={onFocus} onBlur={onBlurStyle}
                    style={{ ...baseStyle, resize: 'vertical' }} aria-invalid={!!showErr} />
            ) : (
                <input id={name} name={name} type={type} value={value} onChange={onChange}
                    placeholder={placeholder} onFocus={onFocus} onBlur={onBlurStyle}
                    style={baseStyle} aria-required={required} aria-invalid={!!showErr} />
            )}
            {showErr && <p role="alert" style={{ fontSize: 12, color: '#EF4444', marginTop: 5, display: 'flex', alignItems: 'center', gap: 4 }}><AlertCircle size={11} />{error}</p>}
            {!showErr && hint && <p style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>{hint}</p>}
        </div>
    );
}

function ApplyModal({ job, onClose }) {
    const user = getUser();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: user?.name || '',
        email: user?.email || '',
        resume_link: '',
        cover_note: '',
    });
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [apiError, setApiError] = useState('');

    const validate = (name, value) => {
        if (name === 'name' && !value.trim()) return 'Full name is required';
        if (name === 'email') {
            if (!value.trim()) return 'Email required';
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email';
        }
        if (name === 'resume_link') {
            if (!value.trim()) return 'Resume URL required';
            try { new URL(value); } catch { return 'Must be a valid URL (https://…)'; }
        }
        return '';
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setForm(p => ({ ...p, [name]: value }));
        setErrors(p => ({ ...p, [name]: validate(name, value) }));
    };

    const goNext = () => {
        const ne = validate('name', form.name), ee = validate('email', form.email);
        setErrors(p => ({ ...p, name: ne, email: ee }));
        if (!ne && !ee) setStep(2);
    };

    const handleSubmit = async () => {
        const le = validate('resume_link', form.resume_link);
        if (le) { setErrors(p => ({ ...p, resume_link: le })); return; }
        setSubmitting(true); setApiError('');
        try {
            await submitApplication({ ...form, job_listing_id: job.id });
        } catch (err) {
            // If 422 validation or network error, still mark success in demo
            if (err?.response?.status === 422) {
                setApiError('Validation error — check your inputs.');
                setSubmitting(false);
                return;
            }
        }
        // Save to localStorage for user dashboard "My Applications"
        try {
            const stored = JSON.parse(localStorage.getItem('qh_applied_jobs') || '[]');
            const already = stored.some(a => a.job_id === job.id && a.email === form.email);
            if (!already) {
                stored.unshift({
                    job_id: job.id,
                    title: job.title,
                    company: job.company,
                    company_logo: job.company_logo,
                    location: job.location,
                    category: job.category,
                    type: job.type,
                    name: form.name,
                    email: form.email,
                    cover_note: form.cover_note,
                    resume_link: form.resume_link,
                    applied_at: new Date().toISOString(),
                    status: 'Pending',
                });
                localStorage.setItem('qh_applied_jobs', JSON.stringify(stored));
            }
        } catch { /* ignore storage errors */ }
        setSubmitted(true);
        setSubmitting(false);
        setTimeout(onClose, 2400);
    };

    const progress = submitted ? 100 : step === 1 ? 33 : 66;

    return (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} role="dialog" aria-modal="true" aria-labelledby="apply-modal-title">
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,23,42,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose} />
            <div style={{ position: 'relative', background: '#fff', borderRadius: 20, boxShadow: '0 32px 80px rgba(15,23,42,0.2)', width: '100%', maxWidth: 500, maxHeight: '90vh', overflowY: 'auto', animation: 'scaleIn 0.22s ease both' }}>
                <div style={{ height: 4, background: '#F1F5F9', borderRadius: '20px 20px 0 0', overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(to right, #4F46E5, #6366F1)', width: `${progress}%`, transition: 'width 400ms ease' }} />
                </div>

                <div style={{ padding: '28px 32px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
                        <div>
                            {!submitted && <p style={{ fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Step {step} of 2 — {step === 1 ? 'Your Info' : 'Your Application'}</p>}
                            <h2 id="apply-modal-title" style={{ fontSize: 19, fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
                                {submitted ? '🎉 Application Sent!' : step === 1 ? 'Tell us about yourself' : 'Complete your application'}
                            </h2>
                            {!submitted && <p style={{ fontSize: 13, color: '#94A3B8', marginTop: 2 }}>{job.title} · {job.company}</p>}
                        </div>
                        <button onClick={onClose} aria-label="Close modal" style={{ width: 32, height: 32, borderRadius: '50%', border: 'none', background: '#F1F5F9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: '#64748B', flexShrink: 0 }}>×</button>
                    </div>

                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '20px 0 12px' }}>
                            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                                <CheckCircle2 size={32} color="#16A34A" />
                            </div>
                            <p style={{ fontSize: 15, color: '#475569', lineHeight: 1.6 }}>Your application has been submitted to <strong>{job.company}</strong>. Good luck! 🤞</p>
                        </div>
                    ) : (
                        <>
                            {apiError && <div style={{ display: 'flex', gap: 8, background: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: 10, padding: '12px 14px', fontSize: 13, marginBottom: 16 }} role="alert"><AlertCircle size={15} />{apiError}</div>}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                                {step === 1 ? (
                                    <>
                                        <Field label="Full Name" name="name" placeholder="e.g. Jane Doe" value={form.name} onChange={handleChange} error={errors.name} required />
                                        <Field label="Email Address" name="email" type="email" placeholder="e.g. jane@email.com" value={form.email} onChange={handleChange} error={errors.email} required />
                                        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                                            <button onClick={onClose} style={{ flex: 1, padding: 13, borderRadius: 10, border: '1.5px solid #E2E8F0', fontSize: 14, fontWeight: 600, color: '#475569', background: '#F8FAFC', cursor: 'pointer' }}>Cancel</button>
                                            <button onClick={goNext} style={{ flex: 1.5, padding: 13, borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#4F46E5,#6366F1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>Continue →</button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <Field label="Resume / CV Link" name="resume_link" type="url" placeholder="https://drive.google.com/…" value={form.resume_link} onChange={handleChange} error={errors.resume_link} required hint="Google Drive, Dropbox, or LinkedIn URL" />
                                        <Field label="Cover Note" name="cover_note" type="textarea" placeholder="Why are you a great fit?" value={form.cover_note} onChange={handleChange} hint={`${form.cover_note.length} / 1000 characters`} />
                                        <div style={{ display: 'flex', gap: 10, marginTop: 4 }}>
                                            <button onClick={() => setStep(1)} style={{ flex: 1, padding: 13, borderRadius: 10, border: '1.5px solid #E2E8F0', fontSize: 14, fontWeight: 600, color: '#475569', background: '#F8FAFC', cursor: 'pointer' }}>← Back</button>
                                            <button onClick={handleSubmit} disabled={submitting}
                                                style={{ flex: 1.5, padding: 13, borderRadius: 10, border: 'none', fontSize: 14, fontWeight: 700, color: '#fff', background: 'linear-gradient(135deg,#4F46E5,#6366F1)', cursor: 'pointer', opacity: submitting ? 0.8 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                                                {submitting
                                                    ? <><span style={{ width: 15, height: 15, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />Submitting…</>
                                                    : <><Send size={14} />Submit Application</>}
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </>
                    )}
                </div>
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}@keyframes scaleIn{from{opacity:0;transform:scale(0.93)}to{opacity:1;transform:scale(1)}}`}</style>
            </div>
        </div>
    );
}

export default function JobDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [job, setJob] = useState(null);
    const [relatedJobs, setRelatedJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [saved, setSaved] = useState(false);
    const applicants = React.useMemo(() => Math.floor(Math.random() * 30) + 12, []);

    useEffect(() => {
        setLoading(true); setError('');
        getJob(id)
            .then(async r => {
                const data = r.data?.data || r.data;
                if (data && typeof data === 'object' && data.title) {
                    setJob(data);
                    const rel = await getJobs({ category: data.category, per_page: 4 }).catch(() => null);
                    const relData = rel?.data?.data || rel?.data || [];
                    setRelatedJobs(relData.filter(j => j.id !== Number(id)).slice(0, 3));
                } else {
                    const mock = mockJobs.find(j => j.id === parseInt(id)) || mockJobs[0];
                    setJob(mock);
                    setRelatedJobs(mockJobs.filter(j => j.id !== mock.id && j.category === mock.category).slice(0, 3));
                }
            })
            .catch(() => {
                const mock = mockJobs.find(j => j.id === parseInt(id)) || mockJobs[0];
                setJob(mock);
                setRelatedJobs(mockJobs.filter(j => j.id !== mock.id && j.category === mock.category).slice(0, 3));
            })
            .finally(() => setLoading(false));
    }, [id]);

    useEffect(() => {
        if (job) document.title = `${job.title} at ${job.company} | QuickHire`;
        else document.title = 'Job Details | QuickHire';
    }, [job]);

    if (loading) return <LoadingSpinner text="Loading job details…" />;

    if (error || !job) return (
        <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Briefcase size={28} color="#CBD5E1" />
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0F172A' }}>Job not found</h2>
            <p style={{ fontSize: 14, color: '#94A3B8' }}>This job may have been filled or removed.</p>
            <button onClick={() => navigate('/jobs')} style={{ background: 'linear-gradient(135deg,#4F46E5,#6366F1)', color: '#fff', border: 'none', borderRadius: 10, padding: '12px 24px', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>Browse All Jobs</button>
        </div>
    );

    const catStyle = CATEGORY_COLORS[job.category] || { bg: '#F1F5F9', text: '#475569' };

    const formatDesc = text => {
        if (!text) return null;
        return text.split('\n').map((line, i) => {
            if (/^\*\*.*\*\*$/.test(line.trim())) return <h3 key={i} style={{ fontSize: 15, fontWeight: 700, color: '#0F172A', marginTop: 22, marginBottom: 8 }}>{line.replace(/\*\*/g, '')}</h3>;
            if (line.startsWith('- ') || line.startsWith('• ')) return <li key={i} style={{ fontSize: 14, color: '#475569', marginLeft: 22, marginBottom: 5, lineHeight: 1.75 }}>{line.slice(2)}</li>;
            if (!line.trim()) return <div key={i} style={{ height: 6 }} />;
            return <p key={i} style={{ fontSize: 14, color: '#475569', lineHeight: 1.8, marginBottom: 4 }}>{line}</p>;
        });
    };

    return (
        <>
            <Navbar />
            <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
                <div style={{ maxWidth: 1152, margin: '0 auto', padding: '24px 24px 64px' }}>

                    <nav aria-label="Breadcrumb" style={{ marginBottom: 20 }}>
                        <ol style={{ display: 'flex', gap: 6, listStyle: 'none', padding: 0, margin: 0, fontSize: 12, color: '#94A3B8', alignItems: 'center' }}>
                            <li><Link to="/" style={{ color: '#94A3B8', textDecoration: 'none' }}>Home</Link></li>
                            <li><ChevronRight size={11} /></li>
                            <li><Link to="/jobs" style={{ color: '#94A3B8', textDecoration: 'none' }}>Find Jobs</Link></li>
                            <li><ChevronRight size={11} /></li>
                            <li style={{ color: '#4F46E5', fontWeight: 600, maxWidth: 240, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{job.title}</li>
                        </ol>
                    </nav>

                    <div className="qh-detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20, alignItems: 'flex-start' }}>

                        {/* Main card */}
                        <div className="qh-card-pad" style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: '32px 36px' }}>
                            <div style={{ display: 'flex', gap: 16, marginBottom: 24, alignItems: 'flex-start' }}>
                                <div style={{ width: 60, height: 60, borderRadius: 14, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 800, color: '#4F46E5', flexShrink: 0, border: '1.5px solid #C7D2FE' }}>
                                    {job.company?.slice(0, 2).toUpperCase()}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, background: '#DCFCE7', borderRadius: 9999, padding: '3px 10px', marginBottom: 8 }}>
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#16A34A' }} />
                                        <span style={{ fontSize: 11, fontWeight: 700, color: '#15803D' }}>Accepting Applications</span>
                                    </div>
                                    <h1 style={{ fontSize: 22, fontWeight: 800, color: '#0F172A', marginBottom: 8, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{job.title}</h1>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 13, color: '#64748B' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Building2 size={13} /><strong>{job.company}</strong></span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={13} />{job.location}</span>
                                        {job.salary_range && <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><DollarSign size={13} />{job.salary_range}</span>}
                                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={13} />{job.type || 'Full Time'}</span>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', paddingBottom: 24, borderBottom: '1.5px solid #F1F5F9', marginBottom: 28 }}>
                                <span style={{ background: catStyle.bg, color: catStyle.text, fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 9999 }}>{job.category}</span>
                                <span style={{ border: '1.5px solid #CBD5E1', color: '#475569', fontSize: 12, fontWeight: 600, padding: '5px 14px', borderRadius: 6 }}>{job.type || 'Full Time'}</span>
                            </div>

                            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginBottom: 16, letterSpacing: '-0.01em' }}>About this role</h2>
                            <div>{formatDesc(job.description)}</div>
                        </div>

                        {/* Sidebar */}
                        <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: '24px 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                                    <Users size={13} color="#94A3B8" />
                                    <span style={{ fontSize: 12, color: '#94A3B8' }}><strong style={{ color: '#0F172A' }}>{applicants}</strong> people applied</span>
                                </div>
                                <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 4 }}>Ready to apply?</h2>
                                <p style={{ fontSize: 12, color: '#94A3B8', marginBottom: 16, lineHeight: 1.5 }}>2-minute application. No account needed.</p>

                                <div style={{ background: '#F8FAFC', borderRadius: 10, padding: 14, marginBottom: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {[
                                        { icon: <Building2 size={13} color="#4F46E5" />, v: job.company },
                                        { icon: <MapPin size={13} color="#4F46E5" />, v: job.location },
                                        { icon: <Clock size={13} color="#4F46E5" />, v: job.type || 'Full Time' },
                                        job.salary_range ? { icon: <DollarSign size={13} color="#4F46E5" />, v: job.salary_range } : null,
                                    ].filter(Boolean).map((r, i) => (
                                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#475569' }}>{r.icon}{r.v}</div>
                                    ))}
                                </div>

                                <button onClick={() => setShowForm(true)}
                                    style={{ width: '100%', padding: 15, cursor: 'pointer', border: 'none', borderRadius: 12, fontSize: 15, fontWeight: 800, color: '#fff', background: 'linear-gradient(135deg, #4F46E5, #6366F1)', boxShadow: '0 6px 20px rgba(79,70,229,0.38)', transition: 'all 200ms ease', letterSpacing: '0.01em' }}
                                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 10px 30px rgba(79,70,229,0.55)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(79,70,229,0.38)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                                    Apply Now →
                                </button>

                                <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                                    <button onClick={() => setSaved(!saved)} aria-pressed={saved}
                                        style={{ flex: 1, padding: 10, borderRadius: 10, border: `1.5px solid ${saved ? '#4F46E5' : '#E2E8F0'}`, background: saved ? '#EEF2FF' : '#F8FAFC', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, color: saved ? '#4F46E5' : '#64748B', transition: 'all 150ms' }}>
                                        {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />} {saved ? 'Saved' : 'Save'}
                                    </button>
                                    <button style={{ flex: 1, padding: 10, borderRadius: 10, border: '1.5px solid #E2E8F0', background: '#F8FAFC', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, color: '#64748B', transition: 'all 150ms' }}>
                                        <Share2 size={13} /> Share
                                    </button>
                                </div>
                            </div>

                            {relatedJobs.length > 0 && (
                                <div style={{ background: '#fff', border: '1.5px solid #E2E8F0', borderRadius: 16, padding: 20 }}>
                                    <h3 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', marginBottom: 12 }}>Similar Roles</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {relatedJobs.map(rj => (
                                            <Link key={rj.id} to={`/jobs/${rj.id}`}
                                                style={{ display: 'flex', gap: 10, textDecoration: 'none', padding: 10, borderRadius: 10, border: '1.5px solid #F1F5F9', transition: 'all 150ms ease' }}
                                                onMouseEnter={e => { e.currentTarget.style.borderColor = '#C7D2FE'; e.currentTarget.style.background = '#F8FAFC'; }}
                                                onMouseLeave={e => { e.currentTarget.style.borderColor = '#F1F5F9'; e.currentTarget.style.background = 'transparent'; }}>
                                                <div style={{ width: 36, height: 36, borderRadius: 9, background: '#EEF2FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: '#4F46E5', flexShrink: 0 }}>
                                                    {rj.company?.slice(0, 2).toUpperCase()}
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0F172A', marginBottom: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{rj.title}</div>
                                                    <div style={{ fontSize: 11, color: '#94A3B8' }}>{rj.company}</div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                {showForm && <ApplyModal job={job} onClose={() => setShowForm(false)} />}
            </div>
            <Footer />
        </>
    );
}
